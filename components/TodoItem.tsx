import {Todo} from "../typings"
export default function TodoItem({id, completion, task}: Todo) {
    return (
        <div>
            <p>{id + ""}</p>
            <p>{completion + ""}</p>
            <p>{task + ""}</p>
        </div>
    )
}