import MuiModal from "@mui/material/Modal"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Activity, ActivityInputs } from '../typings'
import { actionIDState, activityModalState, activityState } from "../atoms/recoil_state"
import { FaPlay } from "react-icons/fa";
import { HandThumbUpIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import StepSet from "./StepSet";

const defaultValues = {
    title: "Some Activity Title",
    notes: "Some Activity Notes",
    actionList: [
        {
            name: "Some Action Name 1",
            actualSteps: [{ content: "some step content 1" }, { content: "some step content 2" }]
        },
        {
            name: "Some Action Name 2",
            actualSteps: [{ content: "some step content 1" }, { content: "some step content 2" }]
        },
    ]
};

function Modal() {
    const [showActivityModal, setShowActivityModal] = useRecoilState(activityModalState)
    const [activity, setActivity] = useRecoilState<Activity | null>(activityState)
    const [actionID, setActionID] = useRecoilState<number>(actionIDState)
    const { getValues, reset, setValue, register, control, handleSubmit, formState: { errors } } = useForm<ActivityInputs>({ defaultValues });

    const { fields, append, remove } = useFieldArray({
        name: "actionList",
        control
    });


    const handleClose = () => {
        setShowActivityModal(false)
    }

    const onSubmit: SubmitHandler<ActivityInputs> = async (data) => {
        console.log(data)
    }


    return (
        <MuiModal open={showActivityModal} onClose={handleClose} className="fixed bg-black/75 h-[90vh] z-50 mx-auto my-10 w-full max-w-7xl overflow-hidden rounded-md scrollbar-hide border-solid border-2 border-sky-500">
            <div>
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                    onClick={handleClose}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                {
                    /*
                <input className="text-4xl" {...register(`title`)}>{activity?.title}</input>

                    */
                }
                <h1>{activity?.title}</h1>
                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-row items-center justify-start">
                            {fields.map((field, index) => {
                                return (
                                    <div key={field.id}>
                                        <input
                                            placeholder="Name"
                                            {...register(`actionList.${index}.name` as const, {
                                                required: true
                                            })}
                                            defaultValue={field.name}
                                        />
                                        <button type="button" onClick={() => remove(index)}>
                                            DELETE
                                        </button>
                                        <StepSet nestIndex={index} {...{ control, register }} />
                                        <button onClick={() => alert("cliecked")}><PlusIcon className="h-6 w-6 modalButton" /></button>
                                    </div>
                                );
                            }
                            )}
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                append({
                                    name: "Some Action Name",
                                    actualSteps: [{ content: "some step content 1" }, { content: "some step content 2" }]
                                })
                            }
                            }
                        >
                            APPEND
                        </button>
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </MuiModal>
    )
}

export default Modal;