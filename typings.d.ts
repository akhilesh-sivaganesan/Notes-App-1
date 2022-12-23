export interface Inputs {
    states: [],
    location: String,
    thoughts: String,
    reminders: String,
    unexpected: String,
    foresight: String,
}

export interface ActivityInputs {
    actionList: {name: string, actualSteps: {content: string}[]}[],
    title: string,
    notes: string,
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
    notes: string,
    actionList: Action[],
}

export interface Action {
    id: number,
    name: string,
    predicted ?: Step[],
    startTime ?: Date,
    endTime ?: Date,
    actual: Step[],
}

export interface Step {
    id: number,
    content: string,
}