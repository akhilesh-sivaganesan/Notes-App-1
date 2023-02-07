import Grid from "@mui/material/Grid"
import { useRecoilState } from "recoil"
import { tasksState } from "../atoms/recoil_state"
import TaskComponent from "./TaskComponent"
export default function TaskSet() {
    const [tasks, setTasks] = useRecoilState(tasksState)
    return (
        <div className="flex flex-col space-y-5 py-10">
            <h1 className="text-4xl">Ongoing Tasks</h1>
            <Grid container spacing={1} className="my-4">
                {
                    tasks.map(
                        (t, i) =>


                            !t.completed ?
                                <Grid item xs={9} md={6} key={i}>
                                    <TaskComponent key={i}
                                        createdAt={t.createdAt}
                                        title={t.title}
                                        timed={t.timed}
                                        minutesEstimate={t.minutesEstimate}
                                        dueDate={t.dueDate}
                                        completed={t.completed}
                                        tags={t.tags}
                                        userId={t.userId}
                                        actions={t.actions}
                                        description={t.description}
                                        startTime={t.startTime}
                                        endTime={t.endTime}
                                        expiryTimestamp={t.expiryTimestamp}
                                        obstacles={t.obstacles}
                                        showModal={t.showModal}
                                    />
                                </Grid>
                                :
                                <></>
                    )
                }
            </Grid>

        </div>
    )
}