import { Activity } from "../typings";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import { useRecoilState } from "recoil";
import { activityModalState, activityListState, activityState, activityReportModalState, activityReportState } from "../atoms/recoil_state";
import ClockIcon from '@heroicons/react/24/outline/ClockIcon'
import CalendarIcon from '@heroicons/react/24/outline/CalendarIcon'
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteActivity } from "../api/activity";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from "../firebase";
import { useEffect } from "react";

export default function ActivityItem(
    { id, title,
        startTime,
        endTime,
        actionList,
    }: Activity) {
    const [showActivityModal, setShowActivityModal] = useRecoilState<boolean>(activityModalState)
    const [activity, setActivity] = useRecoilState<Activity | null>(activityState)
    const [activityList, setActivityList] = useRecoilState<Activity[]>(activityListState)
    const [showActivityReportModal, setShowActivityReportModal] = useRecoilState<boolean>(activityReportModalState)
    const [activityReport, setActivityReport] = useRecoilState(activityReportState)
    const { user } = useAuth()

    function handleClick() {
        setActivityReport(activityList.find(o => o.startTime === startTime) || {} as Activity)
        setShowActivityReportModal(true)
    }

    function dateDiffToString(a: Date, b: Date) {
        var diff = Math.abs(a.getTime() - b.getTime());
        var ms = diff % 1000;
        diff = (diff - ms) / 1000
        var ss = diff % 60;
        diff = (diff - ss) / 60
        var mm = diff % 60;
        diff = (diff - mm) / 60
        var hh = diff % 24;
        var days = (diff - hh) / 24

        return mm + "min " + ss + "s";
    }

    async function handleDelete() {
        setActivityList(activityList.filter(activity => activity.startTime !== startTime))
        await deleteActivity(startTime.getTime() + "")
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
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={handleClick}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                        <div className="flex flex-row items-center">
                            <CalendarIcon className="h-6 w-6 mr-2" />
                            <Typography variant="body2" color="text.secondary">{startTime.toLocaleTimeString() + " - " + endTime.toLocaleTimeString()}</Typography>
                        </div>
                        <TrashIcon className="absolute top-2 right-2 h-6 w-6" onClick={handleDelete}/>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}