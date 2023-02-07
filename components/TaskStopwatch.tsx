import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import PauseCircleIcon from "@heroicons/react/24/outline/PauseCircleIcon";
import PlayCircleIcon from "@heroicons/react/24/outline/PlayCircleIcon";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useStopwatch } from "react-timer-hook";
import { useRecoilState } from "recoil";
import { taskReportListState, tasksState } from "../atoms/recoil_state";
import { Task, TaskReport } from "../typings";

export default function TaskStopwatch({
    createdAt,
    title,
    timed,
    minutesEstimate,
    dueDate,
    completed,
    tags,
    userId,
    actions,
    description,
    startTime,
    endTime,
    expiryTimestamp,
    obstacles,
    showModal,
}: Task) {

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch({ autoStart: true });


    const [isPlaying, setIsPlaying] = useState(true)
    const [tasks, setTasks] = useRecoilState(tasksState)
    const [taskReportList, setTaskReportList] = useRecoilState(taskReportListState)


    function handleTaskEnd() {
        //Move task 

        //Set task list to have this object completed
        const updatedTaskObj = {
            createdAt: createdAt,
            title: title,
            timed: timed,
            minutesEstimate: minutesEstimate,
            dueDate: dueDate,
            completed: true,
            tags: tags,
            userId: userId,
            actions: actions,
            description: description,
            startTime: startTime,
            endTime: new Date(),
            expiryTimestamp: expiryTimestamp,
            obstacles: obstacles,
            showModal: showModal,
        }
        setTasks(tasks.map(task => [updatedTaskObj].find(o => o.createdAt === task.createdAt) || task))

        const taskReportObj = {
            startTime: startTime,
            endTime: new Date(),
            title: title,
            description: description,
            actions: actions,
            obstacles: obstacles,
        }
        //Add task report obj
        setTaskReportList([...taskReportList, taskReportObj as TaskReport])
    }



    return (

        <div>

            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl">{`${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`}</h1>
                <div className='flex flex-row justify-center items-center'>
                    {isPlaying ? <PauseCircleIcon className="h-6 w-6" onClick={() => { pause(); setIsPlaying(!isPlaying); }}></PauseCircleIcon> :
                        <PlayCircleIcon className="h-6 w-6" onClick={() => { start(); setIsPlaying(!isPlaying); }}></PlayCircleIcon>
                    }
                </div>
            </div>
        </div>
    )
}