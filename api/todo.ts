import { db } from "../firebase";
import {
    collection,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { Todo } from "../typings";
const addTodo = async ({ task, completion, id, createdAt, userId } : any) => {
    try {
        await setDoc(doc(db, "todo", createdAt.getTime() + ""), {
            user: userId,
            id: id,
            task: task,
            completion: completion,
            createdAt: createdAt.getTime(),
        });
    } catch (err) {
        console.log(err)
    }
};
const toggleTodoStatus = async ({ docId, completion } : any) => {
    try {
        const todoRef = doc(db, "todo", docId + "");
        await updateDoc(todoRef, {
            completion,
        });
    } catch (err) {
        console.log(err);
    }
};
const deleteTodo = async (docId : any) => {
    try {
        const todoRef = doc(db, "todo", docId + "");
        await deleteDoc(todoRef);
    } catch (err) {
        console.log(err);
    }
};
export { addTodo, toggleTodoStatus, deleteTodo };