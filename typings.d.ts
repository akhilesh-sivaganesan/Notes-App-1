export interface Inputs {
    states: [],
    location: String,
    thoughts: String,
    reminders: String,
    unexpected: String,
    foresight: String,
}

export interface Snapshot {
    id: number,
    time: Date,
    todoList: [],
    states: [],
    location: String,
    thoughts: String,
    reminders: String,
    unexpected: String,
    foresight: String,
}

export interface Todo {
    id: number,
    completion: boolean,
    task: String
}

export interface TodoInputs {
    completion: Boolean,
    task: String
}