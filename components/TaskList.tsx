import { Button, Checkbox, TextField } from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRecoilState } from "recoil";
import { tagListState, taskListState } from "../atoms/recoil_state";
import { Tag, TaskFormInputs, TaskListItem } from "../typings";
import TaskItem from "./TaskItem";
import useAuth from '../hooks/useAuth';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import makeAnimated from 'react-select/animated';
import Timer from "@mui/icons-material/Timer";
import TimerOff from "@mui/icons-material/TimerOff";




export default function TaskList() {
    const [taskList, setTaskList] = useRecoilState<TaskListItem[]>(taskListState);
    const [tagList, setTagList] = useRecoilState<Tag[]>(tagListState);

    const defaultValues = {
        title: "Some task name",
        timed: false,
        tags: [],
        dueDate: new Date()
    }
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<TaskFormInputs>({defaultValues});
    const { user } = useAuth()

    const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
        const taskListItemObj = JSON.parse(JSON.stringify(data))
        taskListItemObj.createdAt = new Date();
        taskListItemObj.userId = user?.uid
        taskListItemObj.completed = false;
        taskListItemObj.minutesEstimate = 7,
        setTaskList([...taskList, taskListItemObj as TaskListItem])
    }

    return (
        <div className="flex flex-col md:items-left items-left py-10 space-y-8">
            <h1 className="text-4xl">Task List</h1>
            <div className="flex flex-col items-start space-y-8">
                {
                    taskList.map(
                        (t, i) => <TaskItem key={t.createdAt.toLocaleTimeString()}
                                            createdAt={t.createdAt}
                                            title={t.title}
                                            timed={t.timed}
                                            minutesEstimate={t.minutesEstimate}
                                            dueDate={t.dueDate}
                                            completed={t.completed}
                                            tags={t.tags}
                                            userId={t.userId}
                                    />
                    )
                }
            </div>
            
            <div>
                <form className="flex flex-col flex-wrap space-x-2 space-y-5 justify-start max-w-sm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-row items-center">
                        <Checkbox color="warning" defaultChecked={false} icon={<TimerOff/>} checkedIcon={<Timer/>} {...register('timed', { required: false })} />
                        <label>Timed</label>
                    </div>
                    <TextField
                        {...register('title', { required: true })}
                        placeholder="Enter Task"
                    />
                    <Controller
                        {...register('tags', { required: true })}
                        control={control}
                        render={({ field }) => (
                            <Select
                                isClearable
                                components={makeAnimated()}

                                {...field}
                                options={tagList}
                                isMulti
                                defaultValue={[tagList[0], tagList[1]]}
                                closeMenuOnSelect={false}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        {...register('dueDate', { required: true })}
                        render={({ field }) => (
                            <DatePicker
                                className="input"
                                placeholderText="Select Due Date"
                                onChange={(e : any) => field.onChange(e)}
                                selected={field.value}
                            />
                        )}
                    />


                    <Button type="submit" variant="outlined" value="Submit">Submit</Button>


                </form>
            </div>
        </div>
    )
}