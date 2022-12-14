import MuiModal from "@mui/material/Modal"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useRecoilState, useRecoilValue } from 'recoil';
import { Snapshot } from '../typings'
import { modalState, snapshotState } from "../atoms/recoil_state"
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { HandThumbUpIcon, PlusIcon } from "@heroicons/react/24/outline";


function Modal() {
    const [showModal, setShowModal] = useRecoilState(modalState)
    const [snapshot, setSnapshot] = useRecoilState<Snapshot | null>(snapshotState)

    const handleClose = () => {
        setShowModal(false)
    }


    return (
        <MuiModal open={showModal} onClose={handleClose} className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
            <>
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                    onClick={handleClose}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>

                <div className="relative pt-[56.25%]">
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className="flex space-x-2">
                            <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                                <FaPlay className="h-7 w-7 text-black" />
                                Play
                            </button>
                            <button className="modalButton">
                                <PlusIcon className="h-7 w-7" />
                            </button>
                            <button className="modalButton">
                                <HandThumbUpIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <h1>Some thign in the modal</h1>
                        <p>{snapshot?.time.toLocaleTimeString()}</p>
                    </div>
                </div>
            </>
        </MuiModal>
    )
}

export default Modal;