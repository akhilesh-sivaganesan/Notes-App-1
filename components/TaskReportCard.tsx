import CalendarIcon from "@heroicons/react/24/outline/CalendarIcon";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRecoilState } from "recoil";
import { currentTaskReportState, showTaskReportModalState, taskReportListState } from "../atoms/recoil_state";
import { TaskReport } from "../typings";

export default function TaskReportCard({startTime, endTime, actions, title, description, obstacles} : TaskReport) {
    const [taskReportList, setTaskReportList] = useRecoilState(taskReportListState)
    const [currentTaskReport, setCurrentTaskReport] = useRecoilState(currentTaskReportState)
    const [showTaskReport, setShowTaskReport] = useRecoilState(showTaskReportModalState)
    function handleClick() {
        setCurrentTaskReport(taskReportList.find(o => o.startTime === startTime) || {} as TaskReport)
        setShowTaskReport(true)
    }


    async function handleDelete() {
        setTaskReportList(taskReportList.filter(t => t.startTime !== startTime))
    }

    
    
    return (
        <div>
            <div>
                <Card sx={{ maxWidth: 345 }}>
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
                            <TrashIcon className="absolute top-2 right-2 h-6 w-6" onClick={handleDelete}/>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>


        </div>
    )
}