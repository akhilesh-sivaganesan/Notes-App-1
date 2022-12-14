import Form from "../components/Form";
import TodoList from "../components/TodoList";

export default function Home() {
  return (
    <div className="flex flex-row flex-wrap">
      <Form/>
      <TodoList />
    </div>
  )
}
