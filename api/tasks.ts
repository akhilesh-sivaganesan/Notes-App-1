import { db } from "../firebase/index";
import {
    collection,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { Task } from "../typings";

const addTask = async ({createdAt,
    userId,
    title,
    description,
    startTime,
    endTime,
    timed,
    expiryTimestamp,
    minutesEstimate,
    dueDate,
    completed,
    actions,
    tags,
    obstacles,
    showModal} : Task) => {
    try {
        await setDoc(doc(db, "tasks", createdAt.getTime() + ""), {
            createdAt: createdAt,
            userId: userId,
            title: title,
            description: description,
            startTime: startTime,
            endTime: endTime,
            timed: timed,
            expiryTimestamp: expiryTimestamp,
            minutesEstimate: minutesEstimate,
            dueDate: dueDate,
            completed: completed,
            actions: actions,
            tags: tags,
            obstacles: obstacles,
            showModal: showModal,
        });
    } catch (err) {
        console.log(err)
    }
};

const deleteTask = async (docId : any) => {
    try {
        const tasksRef = doc(db, "tasks", docId + "");
        await deleteDoc(tasksRef);
    } catch (err) {
        console.log(err);
    }
};
export { addTask, deleteTask };