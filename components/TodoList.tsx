import { Todo } from '../typings'
import { useRecoilState, useRecoilValue } from "recoil"
import { todoListState } from "../atoms/recoil_state";
import TodoItem from './TodoItem';

export default function TodoList() {
    const [todoList, setTodoList] = useRecoilState<Todo[]>(todoListState);
    return(
        <>
        {
            todoList.map(
                (t, i) => <TodoItem key={i} id={t.id} completion={t.completion} task={t.task}/>
              )
        }
        <div>
            
        </div>
        </>
    )
}