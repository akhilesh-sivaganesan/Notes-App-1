import MuiModal from "@mui/material/Modal"
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon'
import { useRecoilState, useRecoilValue } from 'recoil';
import { actionIDState, activityModalState, activityState, activityListState, activityIDState, activityReportModalState, activityReportState } from "../atoms/recoil_state"

function ActivityReport() {
    const [showActivityReportModal, setShowActivityReportModal] = useRecoilState(activityReportModalState)
    const [ activityReport, setActivityReport ] = useRecoilState(activityReportState)

    const handleClose = () => {
        setShowActivityReportModal(false)
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
                <p>{JSON.stringify(activityReport)}</p>
            </div>
        </MuiModal>
    )
}

export default ActivityReport;