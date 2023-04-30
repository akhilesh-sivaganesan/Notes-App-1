import { Button, Grid } from "@mui/material";
import { useRecoilState } from "recoil";
import { currentTaskState, tagListState, taskModalState, taskReportListState, tasksState } from "../atoms/recoil_state";
import { Task, TaskReport } from "../typings"
import TagComponent from "./TagComponent";
import TaskModal from "./TaskModal";
import TaskCountdown from "./TaskCountdown";
import TaskStopwatch from "./TaskStopwatch";
import { addTask, deleteTask } from "../api/tasks";
import { addTaskReport } from "../api/taskreportlist";


export default function TaskComponent({ createdAt,
    userId,
    title,
    description,
    startTime,
    endTime,
    timed,
    expiryTimestamp,
    minutesEstimate,
    dueDate,
    completed,
    actions,
    obstacles,
    tags,
    showModal
}: Task) {


    const [tagList, setTagList] = useRecoilState(tagListState)
    const [currentTask, setCurrentTask] = useRecoilState(currentTaskState)
    const [tasks, setTasks] = useRecoilState(tasksState)
    const [showTaskModal, setShowTaskModal] = useRecoilState(taskModalState)
    const [taskReportList, setTaskReportList] = useRecoilState(taskReportListState)
    function handleTaskEdit() {
        //Make this tasks showModal true
        const updatedTaskObj = {
            createdAt: createdAt,
            title: title,
            timed: timed,
            minutesEstimate: minutesEstimate,
            dueDate: dueDate,
            completed: completed,
            tags: tags,
            userId: userId,
            actions: actions,
            description: description,
            startTime: startTime,
            endTime: endTime,
            expiryTimestamp: expiryTimestamp,
            obstacles: obstacles,
            showModal: true,
        }
        setTasks(tasks.map(task => [updatedTaskObj].find(o => o.createdAt === task.createdAt) || task))
        addTask(updatedTaskObj)
    }

    function handleTaskEnd() {
        //Move task 

        //Set task list to have this object completed
        const updatedTaskObj = {
            createdAt: createdAt,
            title: title,
            timed: timed,
            minutesEstimate: minutesEstimate,
            dueDate: dueDate,
            completed: true,
            tags: tags,
            userId: userId,
            actions: actions,
            description: description,
            startTime: startTime,
            endTime: new Date(),
            expiryTimestamp: expiryTimestamp,
            obstacles: obstacles,
            showModal: showModal,
        }
        setTasks(tasks.map(task => [updatedTaskObj].find(o => o.createdAt === task.createdAt) || task))
        //addTask(updatedTaskObj)
        deleteTask(createdAt.getTime() + "")

        const taskReportObj = {
            startTime: startTime,
            endTime: new Date(),
            title: title,
            description: description,
            actions: actions,
            obstacles: obstacles,
            userId: userId,
        }
        //Add task report obj
        setTaskReportList([...taskReportList, taskReportObj as TaskReport])
        addTaskReport(taskReportObj)
    }

    return (
        <div>


            <div className="flex flex-row border border-white p-5 space-x-5 h-[180px] min-w-min justify-around items-center rounded">
                <div className="flex flex-col items-start space-y-2">
                    <div className="flex flex-row space-x-2">
                        {
                            /*TAGS*/
                            tags.map(
                                (t, i) => <TagComponent key={i} createdAt={t.createdAt} color={t.color} label={t.label} value={t.value} userId={t.userId} />
                            )
                        }
                    </div>
                    <div>
                        <h1 className="text-2xl">{title}</h1>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <Button size="small" variant="outlined" color="success" onClick={handleTaskEdit}>Edit</Button>
                        <Button size="small" variant="outlined" color="error" onClick={handleTaskEnd}>End</Button>
                    </div>


                </div>
                <div>
                    {
                        timed ?
                            <TaskCountdown createdAt={createdAt} userId={userId} title={title} description={description} startTime={startTime} endTime={endTime} timed={timed} expiryTimestamp={expiryTimestamp} minutesEstimate={minutesEstimate} dueDate={dueDate} completed={completed} actions={actions} tags={tags} obstacles={obstacles} showModal={showModal} />
                            :
                            <TaskStopwatch createdAt={createdAt} userId={userId} title={title} description={description} startTime={startTime} endTime={endTime} timed={timed} expiryTimestamp={expiryTimestamp} minutesEstimate={minutesEstimate} dueDate={dueDate} completed={completed} actions={actions} tags={tags} obstacles={obstacles} showModal={showModal} />
                    }
                </div>
            </div>






            <TaskModal createdAt={createdAt} userId={userId} title={title} description={description} startTime={startTime} endTime={endTime} timed={timed} expiryTimestamp={expiryTimestamp} minutesEstimate={minutesEstimate} dueDate={dueDate} completed={completed} actions={actions} tags={tags} obstacles={obstacles} showModal={showModal} />
        </div>
    )
}