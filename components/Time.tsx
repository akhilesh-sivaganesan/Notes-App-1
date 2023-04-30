import { useState } from "react";
import { setInterval } from "timers";

export default function Time() {
    const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
    setInterval(() => setTime((new Date).toLocaleTimeString()), 1000)
    return(
        <div className="w-full h-[800px] flex flex-col justify-center items-center">
            <h1 className="text-8xl">{time}</h1>
            <p>Current Time Displayed for Convenience</p>
        </div>
    )
}