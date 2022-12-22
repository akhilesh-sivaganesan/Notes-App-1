import { useRecoilState, useRecoilValue } from "recoil"
import { activityListState } from "../atoms/recoil_state";
import ActivityItem from "./ActivityItem";
import { Grid } from "@mui/material"


export default function SnapshotSet() {
    const [activityList, setActivityList] = useRecoilState(activityListState)
    return (
        <div className="py-10">
            <h1 className="text-4xl">Activity List</h1>

            <Grid container spacing={1} className="my-4">
                {
                    activityList.map(
                        (activity, i) =>
                            <Grid item xs={9} md={4} key={i}>
                                <ActivityItem id={activity.id} startTime={activity.startTime} actionList={activity.actionList} title={activity.title}
                                    endTime={activity.endTime} />
                            </Grid>
                    )
                }
            </Grid>
        </div>


    )
}