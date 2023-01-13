import { Todo, TodoInputs } from '../typings'
import { useRecoilState, useRecoilValue } from "recoil"
import { todoListState, todoIDState } from "../atoms/recoil_state";
import TodoItem from './TodoItem';
import { TextField, Button, Typography } from "@mui/material"
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import { darkTheme } from "../styles/themes";
import { addTodo } from '../api/todo';
import useAuth from '../hooks/useAuth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';
export default function TodoList() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<TodoInputs>();
    const [todoList, setTodoList] = useRecoilState<Todo[]>(todoListState);
    const [todoID, setTodoID] = useRecoilState<number>(todoIDState)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [value, setValue] = useState("")
    const { user } = useAuth()


    const onSubmit: SubmitHandler<TodoInputs> = async (data) => {
        const todoObj = JSON.parse(JSON.stringify(data))
        todoObj.completion = false;
        todoObj.id = todoID;
        todoObj.createdAt = new Date();
        todoObj.userId = user?.uid
        await(addTodo(todoObj))
        setTodoID(todoID + 1)
        setTodoList([...todoList, todoObj as Todo])
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    }

    function handleKeyDown(event : React.KeyboardEvent<HTMLInputElement>) {
        var inputValue = (document.getElementById("taskInput") as HTMLInputElement).value
        setValue(inputValue)
        //alert(inputValue)
        if (event.key === "Enter") {
            onSubmit
        }
    }

    const refreshData = () => {
        if (!user) {
          setTodoList([]);
          return;
        }
        const q = query(collection(db, "todo"), where("user", "==", user.uid));
    
        onSnapshot(q, (querySnapchot) => {
          let ar = [] as Todo[];
          querySnapchot.docs.forEach((doc) => {
            ar.push({task: doc.data().task, completion: doc.data().completion, id: doc.data().id, userId: doc.data().userId, createdAt: doc.data().createdAt.toDate()});
          });
          setTodoList(ar);
        });
      };
    
      useEffect(() => {
        refreshData();
      }, [user]);




    return (
        <div className="flex flex-col md:items-left items-center py-10 space-y-8">
            <h1 className="text-4xl">To Do List</h1>
            {
                todoList.map(
                    (t, i) => <TodoItem key={t.id} id={t.id} completion={t.completion} task={t.task} createdAt={t.createdAt} userId={t.userId} />
                )
            }
            <div>
                <form className="flex flex-row space-x-2 justify-center" onSubmit={handleSubmit(onSubmit)}>
                    <TextField helperText={errorMessage} error={error} id="taskInput" type="text" placeholder="Enter Task" value={value}
                        {...register('task', { required: true })}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                    <Button type="submit" variant="outlined" value="Submit">Submit</Button>
                </form>
            </div>
        </div>

    )
}