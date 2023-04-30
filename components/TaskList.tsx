import { Button, Checkbox, TextField } from "@mui/material";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { useRecoilState } from "recoil";
import { tagListState, taskListState } from "../atoms/recoil_state";
import { Tag, TaskFormInputs, TaskListItem, Todo } from "../typings";
import TaskItem from "./TaskItem";
import useAuth from '../hooks/useAuth';
import Select, { StylesConfig } from "react-select";
//import DatePicker from "react-datepicker";
//import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import makeAnimated from 'react-select/animated';
import Timer from "@mui/icons-material/Timer";
import TimerOff from "@mui/icons-material/TimerOff";
import chroma from 'chroma-js';
import { addTaskListItem } from "../api/tasklist";
import { useEffect } from "react";

import { collection, onSnapshot, query, Timestamp, where } from 'firebase/firestore';
import { db } from "../firebase/index";




export default function TaskList() {
    const [taskList, setTaskList] = useRecoilState<TaskListItem[]>(taskListState);
    const [tagList, setTagList] = useRecoilState<Tag[]>(tagListState);

    const defaultValues = {
        title: "Some task name",
        timed: false,
        tags: [],
        dueDate: new Date()
    }
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<TaskFormInputs>({ defaultValues });
    const { user } = useAuth()

    const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
        const taskListItemObj = JSON.parse(JSON.stringify(data))
        taskListItemObj.dueDate = new Date(taskListItemObj.dueDate)
        taskListItemObj.createdAt = new Date();
        taskListItemObj.userId = user?.uid
        taskListItemObj.completed = false;
        taskListItemObj.minutesEstimate = 7
        setTaskList([...taskList, taskListItemObj as TaskListItem])
        addTaskListItem(taskListItemObj as TaskListItem)
    }

    const refreshData = () => {
        if (!user) {
          setTaskList([]);
          return;
        }
        const q = query(collection(db, "tasklist"), where("userId", "==", user.uid));
    
        onSnapshot(q, (querySnapchot) => {
          let ar = [] as TaskListItem[];
          querySnapchot.docs.forEach((doc) => {
            ar.push({
                createdAt: doc.data().createdAt.toDate(),
                userId: doc.data().userId,
                title: doc.data().title,
                timed: doc.data().timed,
                minutesEstimate: doc.data().minutesEstimate,
                dueDate: doc.data().dueDate.toDate(),
                completed: doc.data().completed,
                tags: doc.data().tags,
            });
          });
          setTaskList(ar);
        });
      };
    
      useEffect(() => {
        refreshData();
      }, [user]);


    const colourStyles: StylesConfig<Tag, true> = {
        control: (styles) => ({ ...styles, backgroundColor: 'black' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? undefined
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : undefined,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',

                ':active': {
                    ...styles[':active'],
                    backgroundColor: !isDisabled
                        ? isSelected
                            ? data.color
                            : color.alpha(0.3).css()
                        : undefined,
                },
            };
        },
        multiValue: (styles, { data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: color.alpha(0.1).css(),
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                color: 'white',
            },
        }),
    };


    return (
        <div className="flex flex-col md:items-left items-left py-10 space-y-8">
            <h1 className="text-4xl">Task List</h1>
            <div className="flex flex-col items-start space-y-5">
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

            <div className="border border-white w-full p-4 bg-slate-800">
                <form className="flex flex-col flex-wrap space-x-2 space-y-5 justify-start max-w-sm" onSubmit={handleSubmit(onSubmit)}>

                    <div className="flex flex-row items-center">
                        <Checkbox color="warning" defaultChecked={false} icon={<TimerOff />} checkedIcon={<Timer />} {...register('timed', { required: false })} />

                        <TextField
                            {...register('title', { required: true })}
                            placeholder="Enter Task"
                            className="w-full"
                        />
                    </div>


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
                                styles={colourStyles}

                            />
                        )}
                    />

                    <div className="flex flex-row space-x-1 items-center">
                    <Controller
                        control={control}
                        {...register('dueDate', { required: true })}
                        render={({ field }) => (
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <DatePicker
                                    className="max-w-[160px]"
                                    onChange={(e: any) => field.onChange(e)}
                                    value={field.value ?? new Date()}
                                    renderInput={(props) => <TextField {...props} />}
                                />
                            </LocalizationProvider>
                        )}
                    />



                    <Button type="submit" variant="outlined" value="Submit">Submit</Button>

                    </div>
                   


                </form>
            </div>
        </div>
    )
}