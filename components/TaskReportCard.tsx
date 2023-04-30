import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useRecoilState } from "recoil";
import { deleteTaskReport } from "../api/taskreportlist";
import { currentTaskReportState, showTaskReportModalState, taskReportListState } from "../atoms/recoil_state";
import { TaskReport } from "../typings";

export default function TaskReportCard({ startTime, endTime, actions, title, description, obstacles }: TaskReport) {
    const [taskReportList, setTaskReportList] = useRecoilState(taskReportListState)
    const [currentTaskReport, setCurrentTaskReport] = useRecoilState(currentTaskReportState)
    const [showTaskReport, setShowTaskReport] = useRecoilState(showTaskReportModalState)
    function handleClick() {
        setCurrentTaskReport(taskReportList.find(o => o.startTime === startTime) || {} as TaskReport)
        setShowTaskReport(true)
    }


    async function handleDelete() {
        await deleteTaskReport(startTime.getTime() + "")
        setTaskReportList(taskReportList.filter(t => t.startTime !== startTime))
    }



    return (
        <div>
            <div>
                <Card style={{position: "relative"}}>
                    <CardActions className="absolute top-0 right-0 z-10">
                        <IconButton onClick={handleDelete}>
                            <TrashIcon className="h-6 w-6" />
                        </IconButton>
                    </CardActions>
                    <CardActionArea onClick={handleClick}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">{startTime.toDateString()}</Typography>
                            <div className="flex flex-row items-center">
                                <CalendarIcon className="h-6 w-6 mr-2" />
                                <Typography variant="body2" color="text.secondary">{startTime.toLocaleTimeString() + " - " + endTime.toLocaleTimeString()}</Typography>
                            </div>

                        </CardContent>



                    </CardActionArea>


                </Card>
            </div>


        </div>
    )
}