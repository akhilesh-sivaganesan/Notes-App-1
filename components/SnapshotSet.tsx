import { useRecoilState, useRecoilValue } from "recoil"
import { snapshotListState } from "../atoms/recoil_state";
import SnapshotItem from "./SnapshotItem";
import { Grid } from "@mui/material"


export default function SnapshotSet() {
    const [snapshotList, setSnapshotList] = useRecoilState(snapshotListState)
    return (
        <div className="py-10">
            <h1 className="text-4xl">Snapshot List</h1>

            <Grid container spacing={1} className="my-4">
                {
                    snapshotList.map(
                        (s, i) =>
                            <Grid item xs={9} md={5}>
                                <SnapshotItem key={i} id={s.id} time={s.time} todoList={s.todoList} states={s.states}
                                    location={s.location}
                                    thoughts={s.thoughts}
                                    reminders={s.reminders}
                                    unexpected={s.unexpected}
                                    foresight={s.foresight} />
                            </Grid>
                    )
                }
            </Grid>
        </div>


    )
}