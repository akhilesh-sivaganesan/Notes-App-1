import { Snapshot } from "../typings";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function SnapshotItem(
    { time,
        todoList,
        states,
        location,
        thoughts,
        reminders,
        unexpected,
        foresight,
    }: Snapshot) {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
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
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}