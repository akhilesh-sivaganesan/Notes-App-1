import { db } from "../firebase/index";
import {
    collection,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
const addSnapshot = async ({id, time, todoList, states, location, thoughts, reminders, unexpected, foresight, userId} : any) => {
    try {
        await setDoc(doc(db, "snapshot", time.getTime() + ""), {
            id: id,
            time: time,
            todoList: todoList,
            states: states,
            location: location,
            thoughts: thoughts,
            reminders: reminders,
            unexpected: unexpected,
            foresight: foresight,
            userId: userId
        });
    } catch (err) {
        console.log(err)
    }
};

const deleteSnapshot = async (docId : any) => {
    try {
        const snapshotRef = doc(db, "snapshot", docId + "");
        await deleteDoc(snapshotRef);
    } catch (err) {
        console.log(err);
    }
};
export { addSnapshot, deleteSnapshot };