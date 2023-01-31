import { db } from "../firebase/index";
import {
    collection,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { Todo } from "../typings";
const addActivity = async ({ id, startTime, endTime, title, notes, actionList, userId } : any) => {
    try {
        await setDoc(doc(db, "activity", startTime.getTime() + ""), {
            id: id,
            startTime: startTime,
            endTime: endTime,
            title: title,
            notes: notes,
            actionList: actionList,
            userId: userId
        });
    } catch (err) {
        console.log(err)
    }
};

const deleteActivity = async (docId : any) => {
    try {
        const activityRef = doc(db, "activity", docId + "");
        await deleteDoc(activityRef);
    } catch (err) {
        console.log(err);
    }
};
export { addActivity, deleteActivity };