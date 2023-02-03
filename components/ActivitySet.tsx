import ActivityItem from "./ActivityItem";
import { Grid, Button } from "@mui/material"
import { Action, Activity } from "../typings"
import { activityIDState, activityListState, activityModalState, activityState, todoListState } from "../atoms/recoil_state";
import { useRecoilState } from "recoil"
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from "../firebase/index";
import { useEffect } from "react";

export default function ActivitySet() {
    const [showActivityModal, setShowActivityModal] = useRecoilState<boolean>(activityModalState)
    const [activity, setActivity] = useRecoilState<Activity | null>(activityState)
    const [activityList, setActivityList] = useRecoilState<Activity[]>(activityListState)
    const [activityID, setActivityID] = useRecoilState<number>(activityIDState)
    const { user } = useAuth()

    function startActivity() {
        //Create new activity for from this todo
        //set this todo description as the title
        const activityObj = {
            id: activityID,
            title: "",
            startTime: new Date(),
            endTime: new Date(),
            actionList: [] as Action[],
            notes: "",
            userId: user?.uid
        };
        //setActivityID(activityID + 1)
        //setActivityList([...activityList, activityObj as Activity])
        //setActivity(activityList.find(o => o.id === activityObj.id) || null)
        setActivity(activityObj)
        setShowActivityModal(true)
    }

    const refreshData = () => {
        
        if (!user) {
            setActivityList([]);
            return;
        }
        
        const q = query(collection(db, "activity"), where("userId", "==", user?.uid));

        onSnapshot(q, (querySnapchot) => {
            let ar = [] as Activity[];
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.data().id, startTime: doc.data().startTime.toDate(), endTime: doc.data().endTime.toDate(), title: doc.data().title, notes: doc.data().notes, actionList: doc.data().actionList, userId: doc.data().userId });
            });
            setActivityList(ar);
        });
    };

    useEffect(() => {
        refreshData();
    }, [user]);

    return (
        <div className="py-10 space-y-4">
            <h1 className="text-4xl">Activity List</h1>
            <Button color="success" variant="outlined" onClick={startActivity}>Start Activity</Button>
            <Grid container spacing={1} className="my-4">
                {
                    activityList.map(
                        (activity, i) =>
                            <Grid item xs={9} md={4} key={i}>
                                <ActivityItem id={activity.id} startTime={activity.startTime} actionList={activity.actionList} title={activity.title}
                                    endTime={activity.endTime} notes={activity.notes} userId={activity.userId} />
                            </Grid>
                    )
                }
            </Grid>
        </div>


    )
}