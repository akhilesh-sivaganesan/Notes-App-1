import Grid from "@mui/material/Grid"
import { useRecoilState } from "recoil"
import { taskReportListState } from "../atoms/recoil_state"
import TaskReportCard from "./TaskReportCard"

export default function TaskReportSet() {
    const [taskReportList, setTaskReportList] = useRecoilState(taskReportListState)
    return (
        <div className="space-y-4">
            <h1 className="text-4xl">Completed Tasks</h1>
            <Grid container spacing={1} className="my-4">

                {

                    taskReportList.map((t, index) =>
                        <Grid item xs={9} md={4} key={index}>

                            <TaskReportCard startTime={t.startTime} endTime={t.endTime} title={t.title} description={t.description} actions={t.actions} obstacles={t.obstacles} />
                        </Grid>
                    )

                }
            </Grid>

        </div>
    )
}