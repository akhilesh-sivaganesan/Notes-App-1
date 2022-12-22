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

export interface Activity {
    id: number,
    startTime: Date,
    endTime: Date,
    title: string,
    actionList: []
}

export interface Action {
    predicted ?: string,
    startTime ?: Date,
    endTime ?: Date,
    actual: string,
}