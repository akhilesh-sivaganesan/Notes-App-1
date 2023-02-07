import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { currentTaskState, taskModalState, tasksState } from "../atoms/recoil_state";
import useAuth from "../hooks/useAuth";
import MuiModal from "@mui/material/Modal"
import { Task, TaskModalInputs, TaskStep } from "../typings";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import BackspaceIcon from "@heroicons/react/24/outline/BackspaceIcon";
import PlusCircleIcon from "@heroicons/react/24/outline/PlusCircleIcon";
import TaskStepSet from "./TaskStepSet";
import Button from "@mui/material/Button";

export default function TaskModal({
    createdAt,
    title,
    timed,
    minutesEstimate,
    dueDate,
    completed,
    tags,
    userId,
    actions,
    description,
    startTime,
    endTime,
    expiryTimestamp,
    obstacles,
    showModal,
} : Task) {
    const [tasks, setTasks] = useRecoilState(tasksState)
    const { user } = useAuth()



    const defaultValues = {
        title: title,
        description: description,
        actions: actions,
        obstacles: obstacles,
    };

    const { getValues, reset, watch, register, control, handleSubmit, formState: { errors } } = useForm<TaskModalInputs>({defaultValues});
    const watchAllFields = watch();

    const { fields, append, remove } = useFieldArray({
        name: "actions",
        control
    });


    const handleClose = () => {
        const updatedTaskObj = {
            createdAt: createdAt,
            title: title,
            timed: timed,
            minutesEstimate: minutesEstimate,
            dueDate: dueDate,
            completed: completed,
            tags: tags,
            userId: userId,
            actions: actions,
            description: description,
            startTime: startTime,
            endTime: endTime,
            expiryTimestamp: expiryTimestamp,
            obstacles: obstacles,
            showModal: false
        }
        setTasks(tasks.map(task => [updatedTaskObj].find(o => o.createdAt === task.createdAt) || task))
    }

    const onSubmit: SubmitHandler<TaskModalInputs> = async (data) => {
        //Update currentTask to have correct values in list
        const updatedTaskObj = {
            createdAt: createdAt,
            title: data.title,
            timed: timed,
            minutesEstimate: minutesEstimate,
            dueDate: dueDate,
            completed: completed,
            tags: tags,
            userId: userId,
            actions: data.actions,
            description: data.description,
            startTime: startTime,
            endTime: endTime,
            expiryTimestamp: expiryTimestamp,
            obstacles: data.obstacles,
            showModal: false
        }
        setTasks(tasks.map(task => [updatedTaskObj].find(o => o.createdAt === task.createdAt) || task))
    
    }

    return (
        <MuiModal open={showModal} onClose={handleClose} className="fixed bg-black/75 h-[90vh] p-5 z-50 mx-auto my-10 w-full max-w-7xl overflow-scroll rounded-md scrollbar-hide border-solid border-2 border-sky-500">
            <div className="relative space-y-4">
                <button
                    className="modalButton fixed right-[5%] top-[7.5%] !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                    onClick={handleClose}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="space-y-4 w-fit">
                    <input className="activity-modal-input"
                        {...register("title", { required: true })}
                        placeholder='Enter activity title here'
                    ></input>
                    <textarea
                        {...register('description', { required: true })}
                        className="activity-modal-input"
                        placeholder='Enter key points about this activity here'
                    >
                    </textarea>
                    <textarea
                        {...register('obstacles', { required: true })}
                        className="activity-modal-input"
                        placeholder='Enter obstacles you faced here'
                    >
                    </textarea>
                </div>
                <div className="">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="relative w-full overflow-visible"
                    >
                        <div className="flex flex-row items-start justify-start w-full space-x-4">
                            {fields.map((field, index) => {
                                return (
                                    <div key={field.id} className="space-y-4 min-w-[300px]">
                                        <div className="flex flex-row space-x-4">
                                            <input
                                                placeholder="Enter Action Name"
                                                {...register(`actions.${index}.title` as const, {
                                                    required: true
                                                })}
                                                defaultValue={field.title}
                                                className={"activity-modal-input"}
                                            />
                                            <button type="button" onClick={() => remove(index)}>
                                                <BackspaceIcon className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <TaskStepSet nestIndex={index} {...{ control, register }} />
                                    </div>
                                );
                            }
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    //end previous action

                                    append(
                                    {
                                        title: "",
                                        steps: [] as TaskStep[],
                                        startTime: new Date(),
                                        endTime: new Date(),
                                        userId: user?.uid
                                    })
                                }
                                }
                                className="flex flex-row space-x-2 items-center min-w-[200px]"

                            >
                                <PlusCircleIcon className="h-6 w-6" />
                                Add Action
                            </button>
                        </div>


                        <Button type="submit" variant="outlined" className="absolute top-5 !z-40">
                            Submit Activity
                        </Button>
                    </form>
                </div>
            </div>
        </MuiModal>
    )
}