import Grid from "@mui/material/Grid"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { taskReportListState } from "../atoms/recoil_state"
import useAuth from "../hooks/useAuth"
import { TaskAction, TaskReport, TaskStep } from "../typings"
import TaskReportCard from "./TaskReportCard"

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from "../firebase/index";

export default function TaskReportSet() {
    const [taskReportList, setTaskReportList] = useRecoilState(taskReportListState)

    const { user } = useAuth()

    const refreshData = () => {
        if (!user) {
          setTaskReportList([]);
          return;
        }
        const q = query(collection(db, "taskreportlist"), where("userId", "==", user.uid));
    
        onSnapshot(q, (querySnapchot) => {
          let ar = [] as TaskReport[];
          console.log("TaskReportSet Refresh")
          querySnapchot.docs.forEach((doc) => {
            console.log(doc.data())
            let newActions = [] as TaskAction[]
            let fireActions = doc.data().actions
            for (let fireAction of fireActions) {
              let newAction = {
                title: fireAction.title,
                startTime: fireAction.startTime.toDate(),
                endTime: fireAction.endTime.toDate(),
                userId: fireAction.userId,
                steps: [] as TaskStep[]
              }
              
              let newSteps = [] as TaskStep[]
              let fireSteps = fireAction.steps
              for (let fireStep of fireSteps) {
                let newStep = {
                  title: fireStep.title,
                  startTime: fireStep.startTime.toDate(),
                  endTime: fireStep.endTime.toDate(),
                  userId: fireStep.userId,
                }
                newSteps.push(newStep)
              }
              newAction.steps = newSteps
              //For each action
              //look at the dates
              newActions.push(newAction)
            }
            ar.push({
                startTime: doc.data().startTime.toDate(),
                endTime: doc.data().endTime.toDate(),
                title: doc.data().title,
                description: doc.data().description,
                actions: newActions,
                obstacles: doc.data().obstacles,
                userId: doc.data().userId,
            });
          });
          setTaskReportList(ar);
        });
      };
    
      useEffect(() => {
        refreshData();
      }, [user]);



    return (
        <div className="space-y-4">
            <h1 className="text-4xl">Completed Tasks</h1>
            <Grid container spacing={1} className="my-4">

                {

                    taskReportList.map((t, index) =>
                        <Grid item xs={9} md={4} key={index}>

                            <TaskReportCard startTime={t.startTime} endTime={t.endTime} title={t.title} description={t.description} actions={t.actions} obstacles={t.obstacles} userId={t.userId} />
                        </Grid>
                    )

                }
            </Grid>

        </div>
    )
}