import { atom } from 'recoil';
import {Snapshot, Todo, Inputs} from "../typings";


export const snapshotListState = atom({
    key: 'snapshotListState', // unique ID (with respect to other atoms/selectors)
    default: [] as Snapshot[], // default value (aka initial value)
});

export const todoListState = atom({
    key: "todoListState",
    default: [] as Todo[],
})

export const todoIDState = atom({
    key: "todoIDState",
    default: 0 as number
})

export const snapshotIDState = atom({
    key: "snapshotIDState",
    default: 0 as number
})

export const modalState = atom({
    key: 'modalState',
    default: false,
})

export const snapshotState = atom<Snapshot | null>({
    key: "snapshotState",
    default: null
})