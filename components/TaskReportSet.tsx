import { useRecoilState } from "recoil"
import { taskReportListState } from "../atoms/recoil_state"
import TaskReportCard from "./TaskReportCard"

export default function TaskReportSet() {
    const [taskReportList, setTaskReportList] = useRecoilState(taskReportListState)
    return (
        <div>
            <h1 className="text-4xl">Completed Tasks</h1>
            {
            taskReportList.map((t, index) => <TaskReportCard startTime={t.startTime} endTime={t.endTime} title={t.title} description={t.description} actions={t.actions} obstacles={t.obstacles}/>)
            }
        </div>
    )
}