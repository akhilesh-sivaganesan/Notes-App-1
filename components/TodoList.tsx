import { Todo, TodoInputs } from '../typings'
import { useRecoilState, useRecoilValue } from "recoil"
import { todoListState } from "../atoms/recoil_state";
import TodoItem from './TodoItem';
import { TextField, Button } from "@mui/material"
import { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";

export default function TodoList() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<TodoInputs>();
    const [todoList, setTodoList] = useRecoilState<Todo[]>(todoListState);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [value, setValue] = useState("")

    const onSubmit: SubmitHandler<TodoInputs> = async (data) => {    
        console.log(data)
    }

    function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    /*
    function on(event) {
        //If valid input then
        
        if (this.state.value === "") {
            this.setState({error: true})
            this.setState({errorMessage: "Enter valid task"})
            event.preventDefault();
            return;
        }
        taskID++;
        const taskObj = {
            taskName: this.state.value,
            done: false,
            id: taskID
        }
        this.props.parentCallback(taskObj);

        this.setState({error: false});
        this.setState({value: ""});
        this.setState({errorMessage: ""});

        document.getElementById("taskInput").value = '';
        event.preventDefault();
        
    }
    */
    return (
        <>
            {
                todoList.map(
                    (t, i) => <TodoItem key={i} id={t.id} completion={t.completion} task={t.task} />
                )
            }
            <div>
                <form className="flex flex-row" onSubmit={handleSubmit(onSubmit)}>
                    <TextField helperText={errorMessage} error={error} id="taskInput" type="text" placeholder="Enter Task" defaultValue={value} 
                    {...register('task', { required: true })}
                    onChange={handleChange}
                    />
                    <Button type="submit" value="Submit">Submit</Button>
                </form>
            </div>
        </>
    )
}