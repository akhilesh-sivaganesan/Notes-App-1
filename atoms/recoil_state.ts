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

