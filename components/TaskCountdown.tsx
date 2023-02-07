import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import PauseCircleIcon from "@heroicons/react/24/outline/PauseCircleIcon";
import PlayCircleIcon from "@heroicons/react/24/outline/PlayCircleIcon";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useRecoilState } from "recoil";
import { taskReportListState, tasksState } from "../atoms/recoil_state";
import { Task, TaskReport } from "../typings";

export default function TaskCountdown({
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
} : Task) {
    const renderTime = ({ remainingTime }: any) => {
        const numMinutes = Math.floor(remainingTime / 60)
        const numSeconds = remainingTime % 60
        const finalTime = numMinutes + ":" + (numSeconds < 10 ? ("0" + numSeconds) : numSeconds)

        if (remainingTime === 0) {
            return <div className="timer">Too late...</div>;
        }
        return (
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-3xl">{finalTime}</h1>
                <div className='flex flex-row justify-center items-center'>
                    {isPlaying ? <PauseCircleIcon className="h-6 w-6" onClick={() => setIsPlaying(!isPlaying)}></PauseCircleIcon> :
                        <PlayCircleIcon className="h-6 w-6" onClick={() => setIsPlaying(!isPlaying)}></PlayCircleIcon>
                    }
                    {/*<ArrowPathIcon className="h-6 w-6" onClick={restartTimer}></ArrowPathIcon>*/}
                </div>
            </div>
        );
    };

    const [isPlaying, setIsPlaying] = useState(true)
    const [duration, setDuration] = useState(10)
    const [tasks, setTasks] = useRecoilState(tasksState)
    const [taskReportList, setTaskReportList] = useRecoilState(taskReportListState)

    useEffect(() => {
        setDuration(expiryTimestamp.getMinutes() * 60 - new Date().getMinutes() * 60)
    }, [])

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


            <CountdownCircleTimer
                isPlaying={isPlaying}
                duration={duration}
                colors={['#50C878', '#FFC300', '#F39700', '#A30000']}
                colorsTime={[Math.floor(duration / 4 * 3), Math.floor(duration / 4 * 2), Math.floor(duration / 4 * 1), 0]}
                onComplete={handleTaskEnd}
            >
                {renderTime}
            </CountdownCircleTimer>

            
        </div>
    )
}