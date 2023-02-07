import exp from 'constants';
import { User } from 'firebase/auth';
import { atom } from 'recoil';
import { Snapshot, Todo, Activity, Action, Timer, Task, TaskListItem, Tag, TaskReport } from "../typings";


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

export const timerListState = atom({
    key: "timerListState",
    default: [] as Timer[]
})


export const taskListState = atom({
    key: "taskListState",
    default: [] as TaskListItem[]
})


export const tasksState = atom({
    key: "tasksStates",
    default: [] as Task[]
})

export const tagListState = atom({
    key: "tagListState",
    default: [
        { value: "School Work", label: "School Work", userId: undefined, color: "#f39700", createdAt: new Date() },
        { value: "Later Work", label: "Later Work", userId: undefined, color: "#a9cc51", createdAt: new Date()  },
        { value: "Cooking", label: "Cooking", userId: undefined, color: "#0079c2", createdAt: new Date()  }
    ] as Tag[]
})

export const currentTaskState = atom<Task | null>({
    key: "currentTaskState",
    default: null
})

export const taskModalState = atom({
    key: "taskModalState",
    default: false,
})

export const taskReportListState = atom({
    key: "taskReportListState",
    default: [] as TaskReport[]
})

export const showTaskReportModalState = atom({
    key: "showTaskReportModalState",
    default: false
})

export const currentTaskReportState = atom<TaskReport | null>({
    key: "currentTaskReportState",
    default: null,
})