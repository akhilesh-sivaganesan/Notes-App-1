import MuiModal from "@mui/material/Modal"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Activity } from '../typings'
import { activityModalState, activityState} from "../atoms/recoil_state"
import { FaPlay } from "react-icons/fa";
import { HandThumbUpIcon, PlusIcon } from "@heroicons/react/24/outline";


function Modal() {
    const [showActivityModal, setShowActivityModal] = useRecoilState(activityModalState)
    const [activity, setActivity] = useRecoilState<Activity | null>(activityState)

    const handleClose = () => {
        setShowActivityModal(false)
    }


    return (
        <MuiModal open={showActivityModal} onClose={handleClose} className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden rounded-md scrollbar-hide">
            <>
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                    onClick={handleClose}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <div className="relative pt-[56.25%]">
                </div>
                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <h1>Some thign in the modal</h1>
                        <p>{activity?.title}</p>
                    </div>
                </div>
            </>
        </MuiModal>
    )
}

export default Modal;