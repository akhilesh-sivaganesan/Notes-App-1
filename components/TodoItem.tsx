import { Todo } from "../typings"
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { todoListState } from "../atoms/recoil_state";
import { useRecoilState } from "recoil"


export default function TodoItem({ id, completion, task }: Todo) {

    const [todoList, setTodoList] = useRecoilState<Todo[]>(todoListState)
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


    return (
        <div>
            <div className="flex flex-row w-full">
                <Checkbox color="success" onChange={handleStatusChange} checked={completion} />
                <TextField id={id + ""} label="Task" variant="standard" defaultValue={task} onChange={handleTaskChange} />
                <Button color="error" onClick={handleDeletion}>Delete</Button>
            </div>
        </div>
    )
}