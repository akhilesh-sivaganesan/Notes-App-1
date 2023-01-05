import MuiModal from "@mui/material/Modal"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import ClockIcon from '@heroicons/react/24/outline/ClockIcon'
import CalendarIcon from '@heroicons/react/24/outline/CalendarIcon'

import { useRecoilState, useRecoilValue } from 'recoil';
import { actionIDState, activityModalState, activityState, activityListState, activityIDState, activityReportModalState, activityReportState } from "../atoms/recoil_state"

function ActivityReport() {
    const [showActivityReportModal, setShowActivityReportModal] = useRecoilState(activityReportModalState)
    const [activityReport, setActivityReport] = useRecoilState(activityReportState)

    const handleClose = () => {
        setShowActivityReportModal(false)
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
        <MuiModal open={showActivityReportModal} onClose={handleClose} className="fixed bg-black/75 h-[90vh] p-5 z-50 mx-auto my-10 w-full max-w-7xl overflow-scroll rounded-md scrollbar-hide border-solid border-2 border-sky-500">
            <div className="space-y-4">
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                    onClick={handleClose}
                >
                    <XMarkIcon className="h-6 w-6" />
                </button>
                <h1 className="text-4xl">{activityReport.title}</h1>
                <p className="max-w-sm">{activityReport.notes}</p>
                <div className="flex flex-row">
                    <ClockIcon className="h-6 w-6 mr-2" />
                    <p>{dateDiffToString(activityReport.startTime, activityReport.endTime)}</p>
                </div>
                <div className="flex flex-row">
                    <CalendarIcon className="h-6 w-6 mr-2" />
                    <p>{activityReport.startTime.toLocaleTimeString() + " - " + activityReport.endTime.toLocaleTimeString()}</p>
                </div>
                <ol className="space-y-4 report-action-list">
                    {
                        activityReport.actionList.map(
                            (action, index) =>
                                <li key={index} >
                                    <h1 className="text-2xl">{action.name}</h1>
                                    <div>
                                    {
                                        action.actualSteps.map((step, i) => 
                                            <div key={i}>
                                                <p>{step.content}</p>
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

export default ActivityReport;