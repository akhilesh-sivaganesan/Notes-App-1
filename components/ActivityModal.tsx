import MuiModal from "@mui/material/Modal"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Activity, ActivityInputs } from '../typings'
import { actionIDState, activityModalState, activityState } from "../atoms/recoil_state"
import { FaPlay } from "react-icons/fa";
import { HandThumbUpIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";


function Modal() {
    const [showActivityModal, setShowActivityModal] = useRecoilState(activityModalState)
    const [activity, setActivity] = useRecoilState<Activity | null>(activityState)
    const [actionID, setActionID] = useRecoilState<number>(actionIDState)
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ActivityInputs>({
        defaultValues: {
            actionList: [{
                title: "First Action",
            }]
        },
        mode: "onBlur"
    });

    const { fields, append, remove } = useFieldArray({
        name: "actionList",
        control
    });


    const handleClose = () => {
        setShowActivityModal(false)
    }

    const onSubmit: SubmitHandler<ActivityInputs> = async (data) => {
        //What is the format of inputs entered int he form
        //There are a set of actions each with a set of steps
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
                <h1 className="text-4xl">{activity?.title}</h1>
                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-row items-center justify-start">
                            {fields.map((field, index) => {
                                return (
                                    <div key={field.id}>
                                        <section className={"section"} key={field.id}>
                                            <input
                                                placeholder="title"
                                                {...register(`actionList.${index}.title` as const, {
                                                    required: true
                                                })}
                                                className={errors?.actionList?.[index]?.title ? "error" : ""}
                                                defaultValue={field.title}
                                            />
                                            <button type="button" onClick={() => remove(index)}>
                                                DELETE
                                            </button>
                                        </section>
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
                                    title: "New Action Title",
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