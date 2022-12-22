import { Activity } from "../typings";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useRecoilState } from "recoil";
import { activityModalState, activityListState, activityState } from "../atoms/recoil_state";

export default function ActivityItem (
    { id, title,
        startTime,
        endTime,
        actionList,
    }: Activity) {
        const [showActivityModal, setShowActivityModal] = useRecoilState<boolean>(activityModalState)
        const [ activity, setActivity ] = useRecoilState<Activity | null>(activityState)
        const [ activityList, setActivityList ] = useRecoilState<Activity[]>(activityListState)

    function handleClick() {
        setActivity(activityList.find(o => o.id === id) || null)
        setShowActivityModal(true)
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
                            {startTime.toLocaleTimeString()}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}