import { User } from 'firebase/auth';
import { atom } from 'recoil';
import {Snapshot, Todo, Activity, Action} from "../typings";


export const snapshotListState = atom({
    key: 'snapshotListState', // unique ID (with respect to other atoms/selectors)
    default: [] as Snapshot[], // default value (aka initial value)
});

export const todoListState = atom({
    key: "todoListState",
    default: [] as Todo[],
})

export const activityListState = atom({
    key: "activityListState",
    default: [] as Activity[],
})

export const todoIDState = atom({
    key: "todoIDState",
    default: 0 as number
})

export const snapshotIDState = atom({
    key: "snapshotIDState",
    default: 0 as number
})

export const activityIDState = atom({
    key: "activityIDState",
    default: 0 as number
})

export const actionIDState = atom({
    key: "actionIDState",
    default: 0 as number
})

export const stepIDState = atom({
    key: "stepIDState",
    default: 0 as number
})

export const snapshotModalState = atom({
    key: 'snapshotModalState',
    default: false,
})

export const snapshotState = atom<Snapshot | null>({
    key: "snapshotState",
    default: null
})

export const activityModalState = atom({
    key: 'activityModalState',
    default: false,
})

export const activityState = atom<Activity | null>({
    key: "activityState",
    default: null
})

export const activityReportModalState = atom({
    key: "activityReportModalState",
    default: false
})

export const activityReportState = atom({
    key: "activityReportState",
    default: {} as Activity
})
