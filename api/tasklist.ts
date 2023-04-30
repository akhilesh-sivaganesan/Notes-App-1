import { db } from "../firebase/index";
import {
    collection,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
    Timestamp,
} from "firebase/firestore";

import { TaskListItem } from "../typings";

const addTaskListItem = async ({
    createdAt,
    userId,
    title,
    timed,
    minutesEstimate,
    dueDate,
    completed,
    tags,
} : TaskListItem) => {
    try {
        await setDoc(doc(db, "tasklist", createdAt.getTime() + ""), {
            createdAt: createdAt,
            userId: userId,
            title: title,
            timed: timed,
            minutesEstimate: minutesEstimate,
            dueDate:  dueDate,
            completed: completed,
            tags: tags,
        });
    } catch (err) {
        console.log(createdAt)
        console.log(err)
    }
};

const deleteTaskListItem = async (docId : any) => {
    try {
        const tasksRef = doc(db, "tasklist", docId + "");
        await deleteDoc(tasksRef);
    } catch (err) {
        console.log(err);
    }
};
export { addTaskListItem, deleteTaskListItem };