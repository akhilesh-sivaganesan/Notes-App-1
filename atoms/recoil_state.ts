import { atom } from 'recoil';
import {Snapshot, Todo, Inputs} from "../typings";


export const snapshotListState = atom({
    key: 'snapshotListState', // unique ID (with respect to other atoms/selectors)
    default: [] as Snapshot[], // default value (aka initial value)
});

export const todoListState = atom({
    key: "todoListState",
    default: [{
        id: 1,
        completion: false,
        task: "Default task"
    }, {
        id: 2,
        completion: true,
        task: "2 task"
    }, {
        id: 3,
        completion: false,
        task: "3 task"
    }] as Todo[],
})

export const todoIDState = atom({
    key: "todoIDState",
    default: 0 as number
})
