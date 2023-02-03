import { Grid, Button } from "@mui/material"
import { Timer } from "../typings"
import { timerListState } from "../atoms/recoil_state";
import { useRecoilState } from "recoil"
import useAuth from "../hooks/useAuth";
import TimerItem from "./TimerItem";

export default function TimerSet() {
    const [timerList, setTimerList] = useRecoilState<Timer[]>(timerListState)
    const { user } = useAuth()

    function addTimer() {
        const numMinutes = 10
        const expiryTimestamp = new Date();
        expiryTimestamp.setMinutes(expiryTimestamp.getMinutes() + numMinutes);
        const nextTimer = {
            startTime: new Date(),
            title: "Default Timer",
            expiryTimestamp: expiryTimestamp,
        }
        setTimerList([...timerList, nextTimer as Timer])
    }
    return (
        <div className="py-10 space-y-4">
            <h1 className="text-4xl">Timer List</h1>
            <Button color="success" variant="outlined" onClick={addTimer}>Add Timer</Button>
            <Grid container spacing={1} className="my-4">
                {
                    timerList.map(
                        (timer, i) =>
                            <Grid item xs={6} md={3} key={i}>
                                <TimerItem startTime={timer.startTime} title={timer.title} expiryTimestamp={timer.expiryTimestamp}/>
                            </Grid>
                    )
                }
            </Grid>
        </div>


    )
}