import { db } from "../firebase/index";
import {
    collection,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
import { TaskReport } from "../typings";

const addTaskReport = async ({
    startTime,
    endTime,
    title,
    description,
    actions,
    obstacles,
    userId,
} : TaskReport) => {
    try {
        await setDoc(doc(db, "taskreportlist", startTime.getTime() + ""), {
            startTime: startTime,
            endTime: endTime,
            title: title,
            description: description,
            actions: actions,
            obstacles: obstacles,
            userId: userId,
        });
    } catch (err) {
        console.log(err)
    }
};

const deleteTaskReport = async (docId : any) => {
    try {
        const taskReportRef = doc(db, "taskreportlist", docId + "");
        await deleteDoc(taskReportRef);
    } catch (err) {
        console.log(err);
    }
};
export { addTaskReport, deleteTaskReport };