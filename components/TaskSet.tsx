import Grid from "@mui/material/Grid"
import { useEffect } from "react"
import { useRecoilState } from "recoil"
import { tasksState } from "../atoms/recoil_state"
import useAuth from "../hooks/useAuth"
import { Task, TaskAction, TaskStep } from "../typings"
import TaskComponent from "./TaskComponent"

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from "../firebase/index";

export default function TaskSet() {
    const [tasks, setTasks] = useRecoilState(tasksState)
    const { user } = useAuth()

    const refreshData = () => {
        if (!user) {
          setTasks([]);
          return;
        }
        const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    
        onSnapshot(q, (querySnapchot) => {
          let ar = [] as Task[];
          querySnapchot.docs.forEach((doc) => {
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
            console.log("Task Set RefreshData")
            console.log(newActions)
            ar.push({
                createdAt: doc.data().createdAt.toDate(),
                userId: doc.data().userId,
                title: doc.data().title,
                description: doc.data().description,
                startTime: doc.data().startTime.toDate(),
                endTime: doc.data().endTime.toDate(),
                timed: doc.data().timed,
                expiryTimestamp: doc.data().expiryTimestamp.toDate(),
                minutesEstimate: doc.data().minutesEstimate,
                dueDate: doc.data().dueDate.toDate(),
                completed: doc.data().completed,
                actions: newActions,
                tags: doc.data().tags,
                obstacles: doc.data().obstacles,
                showModal: doc.data().showModal,
            });
          });
          setTasks(ar);
        });
      };
    
      useEffect(() => {
        refreshData();
      }, [user]);


    return (
        <div className="flex flex-col space-y-5 py-10">
            <h1 className="text-4xl">Ongoing Tasks</h1>
            <Grid container spacing={1} className="my-4">
                {
                    tasks.map(
                        (t, i) =>


                            !t.completed ?
                                <Grid item xs={9} md={6} key={i}>
                                    <TaskComponent key={i}
                                        createdAt={t.createdAt}
                                        title={t.title}
                                        timed={t.timed}
                                        minutesEstimate={t.minutesEstimate}
                                        dueDate={t.dueDate}
                                        completed={t.completed}
                                        tags={t.tags}
                                        userId={t.userId}
                                        actions={t.actions}
                                        description={t.description}
                                        startTime={t.startTime}
                                        endTime={t.endTime}
                                        expiryTimestamp={t.expiryTimestamp}
                                        obstacles={t.obstacles}
                                        showModal={t.showModal}
                                    />
                                </Grid>
                                :
                                <></>
                    )
                }
            </Grid>

        </div>
    )
}