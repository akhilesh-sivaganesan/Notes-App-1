import { Tag, Task, TaskAction, TaskListItem, TaskStep } from "../typings";
import { Button, Checkbox, Grid, IconButton, TextField } from "@mui/material"
import { useRecoilState } from "recoil";
import { currentTaskState, taskListState, tasksState } from "../atoms/recoil_state";
import Timer from "@mui/icons-material/Timer";
import TimerOff from "@mui/icons-material/TimerOff";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import useAuth from "../hooks/useAuth";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { addTaskListItem, deleteTaskListItem } from "../api/tasklist";
//import "react-datepicker/dist/react-datepicker.css";
import { addTask } from "../api/tasks";
export default function TaskItem({ createdAt, userId, title, timed, minutesEstimate, dueDate, completed, tags }: TaskListItem) {

    const [taskList, setTaskList] = useRecoilState(taskListState)
    const [tasks, setTasks] = useRecoilState(tasksState)
    const { user } = useAuth()

    function handleTaskChange(event: React.ChangeEvent<HTMLInputElement>) {
        //replace the item in the todolist array that matches this current id
        const taskObj = {
            createdAt: createdAt,
            userId: userId,
            completed: completed,
            title: event.target.value,
            minutesEstimate: minutesEstimate,
            dueDate: dueDate,
            tags: tags,
            timed: timed,
        }
        setTaskList(taskList.map(task => [taskObj].find(o => o.createdAt === task.createdAt) || task))
        addTaskListItem(taskObj)
    }

    function handleStatusChange() {
        const taskObj = {
            createdAt: createdAt,
            userId: userId,
            completed: !completed,
            title: title,
            minutesEstimate: minutesEstimate,
            dueDate: dueDate,
            tags: tags,
            timed: timed,
        }

        //toggleTodoStatus({ docId: createdAt.getTime(), completion: taskObj.completion })
        setTaskList(taskList.map(task => [taskObj].find(o => o.createdAt === task.createdAt) || task))
        addTaskListItem(taskObj)

    }
    async function handleDeletion() {
        await (deleteTaskListItem(createdAt.getTime() + ""))
        setTaskList(taskList.filter(task => task.createdAt !== createdAt))
    }
    function handleEngagement() {
        const time = new Date()
        time.setMinutes(time.getMinutes() + (minutesEstimate ?? 0))
        const taskComponentObj = {
            createdAt: new Date(),
            userId: user?.uid,
            title: title,
            description: "none from task item",
            startTime: new Date(),
            endTime: new Date(),
            timed: timed,
            expiryTimestamp: time,
            minutesEstimate: minutesEstimate,
            dueDate: dueDate,
            completed: completed,
            actions: [] as TaskAction[],
            obstacles: "none from task item",
            tags: tags,
            showModal: false,
        }
        addTask(taskComponentObj)
        setTasks([...tasks, taskComponentObj as Task])

    }
    function handleTimedChange() {
        const taskObj = {
            createdAt: createdAt,
            userId: userId,
            completed: completed,
            title: title,
            minutesEstimate: minutesEstimate,
            dueDate: dueDate,
            tags: tags,
            timed: !timed,
        }
        setTaskList(taskList.map(task => [taskObj].find(o => o.createdAt === task.createdAt) || task))
        addTaskListItem(taskObj)
    }
    function handleTimerChange(event: React.ChangeEvent<HTMLInputElement>) {
        const taskObj = {
            createdAt: createdAt,
            userId: userId,
            completed: completed,
            title: title,
            minutesEstimate: parseInt(event.target.value),
            dueDate: dueDate,
            tags: tags,
            timed: timed,
        }
        setTaskList(taskList.map(task => [taskObj].find(o => o.createdAt === task.createdAt) || task))
        addTaskListItem(taskObj)
    }
    function handleDateChange(date: Date | null) {
        const taskObj = {
            createdAt: createdAt,
            userId: userId,
            completed: completed,
            title: title,
            minutesEstimate: minutesEstimate,
            dueDate: date ?? new Date(),
            tags: tags,
            timed: timed,
        }
        setTaskList(taskList.map(task => [taskObj].find(o => o.createdAt === task.createdAt) || task))
        addTaskListItem(taskObj)
    }
    return (
        <div className="relative space-y-2 bg-slate-800 p-3 rounded w-full">
            <IconButton onClick={handleDeletion} className="!absolute top-2 right-2 z-10">
                <DeleteForeverIcon color="error" />
            </IconButton>
            <div className="flex flex-row w-full justify-start items-center">
                <Checkbox color="success" onChange={handleStatusChange} checked={completed} />
                <TextField variant="standard" defaultValue={title} placeholder="Enter Task" className="flex-grow" onChange={handleTaskChange} />
            </div>



            <div className="flex flex-row w-full space-x-3 justify-start items-center">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        className="max-w-[160px]"
                        onChange={(date) => handleDateChange(date)}
                        value={new Date(dueDate)}
                        renderInput={(props) => <TextField {...props} />}
                    />
                </LocalizationProvider>
                <Checkbox color="warning" onChange={handleTimedChange} checked={timed} icon={<TimerOff />} checkedIcon={<Timer />} />
                {
                    timed && <TextField label="Min" variant="standard" className="w-[60px]" type="number" defaultValue={minutesEstimate} onChange={handleTimerChange} />

                }
                <Button color="success" variant="outlined" onClick={handleEngagement}>Start</Button>

            </div>

        </div>

    )
}