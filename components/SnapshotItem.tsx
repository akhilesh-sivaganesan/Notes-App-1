import { Snapshot } from "../typings";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useRecoilState } from "recoil";
import { snapshotModalState, snapshotListState, snapshotState } from "../atoms/recoil_state";
import { deleteSnapshot } from "../api/snapshot";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

export default function SnapshotItem(
    { id, time,
        todoList,
        states,
        location,
        thoughts,
        reminders,
        unexpected,
        foresight,
    }: Snapshot) {
    const [showModal, setShowModal] = useRecoilState<boolean>(snapshotModalState)
    const [snapshot, setSnapshot] = useRecoilState<Snapshot | null>(snapshotState)
    const [snapshotList, setSnapshotList] = useRecoilState<Snapshot[]>(snapshotListState)

    function handleClick() {
        setSnapshot(snapshotList.find(o => o.id === id) || null)
        setShowModal(true)
    }

    async function handleDelete() {
        setSnapshotList(snapshotList.filter(activity => activity.time !== time))
        await deleteSnapshot(time.getTime() + "")
    }

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={handleClick}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {time.toLocaleTimeString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Lizards are a widespread group of squamate reptiles, with over 6,000
                            species, ranging across all continents except
                        </Typography>
                        <TrashIcon className="absolute top-2 right-2 h-6 w-6" onClick={handleDelete}/>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}