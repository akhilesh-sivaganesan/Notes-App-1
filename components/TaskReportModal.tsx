import MuiModal from "@mui/material/Modal"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import ClockIcon from '@heroicons/react/24/outline/ClockIcon'
import CalendarIcon from '@heroicons/react/24/outline/CalendarIcon'
import { useRecoilState } from "recoil"
import { currentTaskReportState, showTaskReportModalState } from "../atoms/recoil_state"


export default function TaskReportModal() {
    const [showTaskReport, setShowTaskReport] = useRecoilState(showTaskReportModalState)
    const [currentTaskReport, setCurrentTaskReport] = useRecoilState(currentTaskReportState)
    const handleClose = () => {
        setShowTaskReport(false)
    }

    function dateDiffToString(a: Date, b: Date) {
        var diff = Math.abs(a.getTime() - b.getTime());
        var ms = diff % 1000;
        diff = (diff - ms) / 1000
        var ss = diff % 60;
        diff = (diff - ss) / 60
        var mm = diff % 60;
        diff = (diff - mm) / 60
        var hh = diff % 24;
        var days = (diff - hh) / 24

        return mm + "min " + ss + "s";
    }

    return (
        <MuiModal open={showTaskReport} onClose={handleClose} className="fixed bg-black/75 h-[90vh] p-5 z-50 mx-auto my-10 w-full max-w-7xl overflow-scroll rounded-md scrollbar-hide border-solid border-2 border-sky-500">
            <div className="space-y-4">
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                    onClick={handleClose}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <h1 className="text-4xl">{currentTaskReport?.title}</h1>
                <p className="max-w-sm">{currentTaskReport?.description}</p>
                <div className="flex flex-row">
                    <ClockIcon className="h-6 w-6 mr-2" />
                    <p>{dateDiffToString(currentTaskReport?.startTime ?? new Date(), currentTaskReport?.endTime ?? new Date())}</p>
                </div>
                <div className="flex flex-row">
                    <CalendarIcon className="h-6 w-6 mr-2" />
                    <p>{currentTaskReport?.startTime.toLocaleTimeString() + " - " + currentTaskReport?.endTime.toLocaleTimeString()}</p>
                </div>
                <ol className="space-y-4 report-action-list">
                    {
                        currentTaskReport?.actions.map(
                            (action, index) =>
                                <li key={index} >
                                    <h1 className="text-2xl">{action.title}</h1>
                                    <div>
                                    {
                                        action.steps.map((step, i) => 
                                            <div key={i}>
                                                <p>{step.title}</p>
                                            </div>
                                        ) 
                                    }
                                    </div>
                                </li>
                        )
                    }
                </ol>

            </div>
        </MuiModal>
    )
}

