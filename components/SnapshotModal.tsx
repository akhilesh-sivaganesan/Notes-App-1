import MuiModal from "@mui/material/Modal"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Snapshot } from '../typings'
import { snapshotModalState, snapshotState } from "../atoms/recoil_state"
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { ClockIcon, HandThumbUpIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Typography } from "@mui/material";


function Modal() {
    const [showModal, setShowModal] = useRecoilState(snapshotModalState)
    const [snapshot, setSnapshot] = useRecoilState<Snapshot | null>(snapshotState)

    const handleClose = () => {
        setShowModal(false)
    }


    return (
        <MuiModal open={showModal} onClose={handleClose} className="fixed bg-black/75 h-[90vh] p-5 z-50 mx-auto my-10 w-full max-w-7xl overflow-scroll rounded-md scrollbar-hide border-solid border-2 border-sky-500">
            <div className="space-y-4">
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                    onClick={handleClose}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <div className="flex flex-row">
                    <ClockIcon className="h-6 w-6 mr-2" />
                    <p>{snapshot?.time.toLocaleTimeString()}</p>
                </div>
                <Typography component="h2" variant="h4">States</Typography>
                <p>{snapshot?.states}</p>

                <Typography component="h2" variant="h4">Location</Typography>
                <p>{snapshot?.location}</p>

                <Typography component="h2" variant="h4">Thoughts</Typography>
                <p>{snapshot?.thoughts}</p>

                <Typography component="h2" variant="h4">Reminders</Typography>
                <p>{snapshot?.reminders}</p>

                <Typography component="h2" variant="h4">Unexpected</Typography>
                <p>{snapshot?.unexpected}</p>

                <Typography component="h2" variant="h4">Foresight</Typography>
                <p>{snapshot?.foresight}</p>
            </div>
        </MuiModal>
    )
}

export default Modal;