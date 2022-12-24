import MuiModal from "@mui/material/Modal"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Activity, ActivityInputs } from '../typings'
import { actionIDState, activityModalState, activityState, activityListState, activityIDState, activityReportState } from "../atoms/recoil_state"
import { PlusIcon } from "@heroicons/react/24/outline";
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
    const [activityList, setActivityList] = useRecoilState<Activity[]>(activityListState)
    const [activityID, setActivityID] = useRecoilState<number>(activityIDState)
    const [ activityReport, setActivityReport ] = useRecoilState(activityReportState)


    const { getValues, reset, setValue, register, control, handleSubmit, formState: { errors } } = useForm<ActivityInputs>({ defaultValues });

    const { fields, append, remove } = useFieldArray({
        name: "actionList",
        control
    });


    const handleClose = () => {
        setShowActivityModal(false)
    }

    const onSubmit: SubmitHandler<ActivityInputs> = async (data) => {
        //make a copy of te ucrrent activity
        //Append that to the list
        //increment the id counter

        const copyObj = JSON.parse(JSON.stringify(activity))
        copyObj.startTime = new Date(copyObj.startTime)
        copyObj.endTime = new Date();
        copyObj.actionList = data.actionList;
        copyObj.notes = data.notes;
        copyObj.title = data.title;

        setActivityList([...activityList, copyObj as Activity])
        setActivityID(activityID + 1)
        setActivity(copyObj)
        setActivityReport(copyObj)
        setShowActivityModal(false)
    }


    return (
        <MuiModal open={showActivityModal} onClose={handleClose} className="fixed bg-black/75 h-[90vh] p-5 z-50 mx-auto my-10 w-full max-w-7xl overflow-scroll rounded-md scrollbar-hide border-solid border-2 border-sky-500">
            <div className="space-y-4">
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                    onClick={handleClose}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="space-y-4">
                    <h1 className="text-4xl">{activity?.title}</h1>
                    <input className="input" {...register("title", { required: true })}></input>
                    <textarea
                        {...register('notes', { required: true })}
                        className="input"
                        placeholder='Enter some notes here'
                    >
                    </textarea>

                </div>
                <div>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="flex flex-row items-start justify-start space-x-4">
                            {fields.map((field, index) => {
                                return (
                                    <div key={field.id} className="space-y-4">
                                        <div className="flex flex-row space-x-4">
                                            <input
                                                placeholder="Name"
                                                {...register(`actionList.${index}.name` as const, {
                                                    required: true
                                                })}
                                                defaultValue={field.name}
                                                className={"input"}
                                            />
                                            <button type="button" onClick={() => remove(index)}>
                                                DELETE
                                            </button>
                                        </div>

                                        <StepSet nestIndex={index} {...{ control, register }} />
                                        <button onClick={() => alert("cliecked")}><PlusIcon className="h-6 w-6 modalButton" /></button>
                                    </div>
                                );
                            }
                            )}
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
                        </div>


                        <input type="submit" />
                    </form>
                </div>
            </div>
        </MuiModal>
    )
}

export default Modal;