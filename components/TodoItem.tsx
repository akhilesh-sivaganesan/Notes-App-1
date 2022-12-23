import { Todo, Activity, Action } from "../typings"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { activityIDState, activityListState, activityModalState, activityState, todoListState } from "../atoms/recoil_state";
import { useRecoilState } from "recoil"


export default function TodoItem({ id, completion, task }: Todo) {

    const [todoList, setTodoList] = useRecoilState<Todo[]>(todoListState)
    const [showActivityModal, setShowActivityModal] = useRecoilState<boolean>(activityModalState)
    const [ activity, setActivity ] = useRecoilState<Activity | null>(activityState)
    const [ activityList, setActivityList ] = useRecoilState<Activity[]>(activityListState)
    const [ activityID, setActivityID ] = useRecoilState<number>(activityIDState)

    function handleTaskChange(event: React.ChangeEvent<HTMLInputElement>) {
        //replace the item in the todolist array that matches this current id
        const todoObj = { id: id, completion: completion, task: event.target.value }
        setTodoList(todoList.map(todo => [todoObj].find(o => o.id === todo.id) || todo))
    }

    function handleStatusChange() {
        const todoObj = { id: id, completion: !completion, task: task }
        setTodoList(todoList.map(todo => [todoObj].find(o => o.id === todo.id) || todo))
    }
    function handleDeletion() {
        setTodoList(todoList.filter(todo => todo.id !== id))
    }
    function handleEngagement() {
        //Create new activity for from this todo
        //set this todo description as the title
        const activityObj = {id: activityID, title: task, startTime: new Date(), actionList: [] as Action[], endTime: new Date(), notes: ""};
        setActivityID(activityID + 1)
        setActivityList([...activityList, activityObj as Activity])
        setActivity(activityList.find(o => o.id === activityObj.id) || null)
        setShowActivityModal(true)
    }


    return (
        <div>
            <div className="flex flex-row w-full space-x-3">
                <Checkbox color="success" onChange={handleStatusChange} checked={completion} />
                <TextField id={id + ""} label="Task" variant="standard" defaultValue={task} onChange={handleTaskChange} />
                <Button color="success" variant="outlined" onClick={handleEngagement}>Engage</Button>
                <Button color="error" variant="outlined" onClick={handleDeletion}>Delete</Button>
            </div>
        </div>
    )
}