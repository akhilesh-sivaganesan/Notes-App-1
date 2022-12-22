import { Todo, TodoInputs } from '../typings'
import { useRecoilState, useRecoilValue } from "recoil"
import { todoListState, todoIDState } from "../atoms/recoil_state";
import TodoItem from './TodoItem';
import { TextField, Button, Typography } from "@mui/material"
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { darkTheme } from "../styles/themes";

export default function TodoList() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<TodoInputs>();
    const [todoList, setTodoList] = useRecoilState<Todo[]>(todoListState);
    const [todoID, setTodoID] = useRecoilState<number>(todoIDState)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [value, setValue] = useState("")

    const onSubmit: SubmitHandler<TodoInputs> = async (data) => {
        const todoObj = JSON.parse(JSON.stringify(data))
        todoObj.completion = false;
        todoObj.id = todoID;
        setTodoID(todoID + 1)
        setTodoList([...todoList, todoObj as Todo])
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    return (
        <div className="flex flex-col md:items-left items-center py-10 space-y-8">
            <h1 className="text-4xl">To Do List</h1>
            {
                todoList.map(
                    (t, i) => <TodoItem key={i} id={t.id} completion={t.completion} task={t.task} />
                )
            }
            <div>
                <form className="flex flex-row space-x-2 justify-center" onSubmit={handleSubmit(onSubmit)}>
                    <TextField helperText={errorMessage} error={error} id="taskInput" type="text" placeholder="Enter Task" defaultValue={value}
                        {...register('task', { required: true })}
                        onChange={handleChange}
                    />
                    <Button type="submit" value="Submit">Submit</Button>
                </form>
            </div>
        </div>

    )
}