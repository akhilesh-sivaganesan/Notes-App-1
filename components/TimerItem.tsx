import { useTimer } from 'react-timer-hook';
import { Timer } from '../typings';
import { Grid, Button } from "@mui/material"
import { ArrowPathIcon, PlayCircleIcon, PauseCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { timerListState } from '../atoms/recoil_state';
import { useRecoilState } from 'recoil';

function TimerItem(
    {
        startTime,
        title,
        expiryTimestamp,
    }: Timer
) {
    const [timerList, setTimerList] = useRecoilState<Timer[]>(timerListState)
    const restartTimer = () => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + 300);
        restart(time)
    }

    const handleDelete = () => {
        setTimerList(timerList.filter(o => o.startTime !== startTime))
    }
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });


    return (
        <div className='relative'>
            <div className='flex flex-col items-center bg-slate-500 p-4 rounded-md'>
                <h1 className='text-2xl'>{title}</h1>
                <div className='text-2xl'>
                    <span>{hours < 10 ? "0" + hours : hours}</span>:<span>{minutes < 10 ? "0" + minutes : minutes}</span>:<span>{seconds < 10 ? "0" + seconds : seconds}</span>
                </div>
                <div className='flex flex-row justify-center items-center'>
                    {isRunning ? <PauseCircleIcon className="h-6 w-6" onClick={pause}></PauseCircleIcon> :
                        <PlayCircleIcon className="h-6 w-6" onClick={resume}></PlayCircleIcon>
                    }
                    <ArrowPathIcon className="h-6 w-6" onClick={restartTimer}></ArrowPathIcon>
                </div>
                <TrashIcon className="absolute top-2 right-2 h-6 w-6 z-10" onClick={handleDelete} />
            </div>
        </div>

    );

}

export default TimerItem;