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
    task: String,
    createdAt: Date,
    userId: String | undefined
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
    userId: String | undefined,
}

export interface Action {
    id: number,
    name: string,
    predicted ?: Step[],
    startTime ?: Date,
    endTime ?: Date,
    actualSteps: Step[],
}

export interface Step {
    id: number,
    content: string,
}

export interface Timer {
    startTime: Date,
    title: string,
    expiryTimestamp: Date,
}

export interface Task {
    createdAt: Date,
    userId: String | undefined,
    title: string,
    description: string,
    startTime: Date,
    endTime: Date,
    timed: boolean,
    expiryTimestamp: Date,
    minutesEstimate: number,
    dueDate: Date,
    completed: boolean,
    actions: TaskAction[]
    tags: Tag[]
    obstacles: string,
    showModal: boolean,
}

export interface TaskStep {
    title: string,
    startTime: Date,
    endTime: Date,
    userId: String | undefined,
}

export interface TaskAction {
    title: string,
    startTime: Date,
    endTime: Date, //Maybe try optional bc creation don't know end date
    userId: String | undefined,
    steps: TaskStep[]
}

export interface Tag {
    createdAt: Date,
    label: string, 
    value: string,
    userId:  String | undefined,
    color: string,
}

export interface TaskFormInputs {
    title: string,
    timed: boolean,
    tags: Tag[],
    dueDate: Date,
}

export interface TaskListItem {
    createdAt: Date,
    userId: String | undefined,
    title: string,
    timed: boolean,
    minutesEstimate: number,
    dueDate: Date,
    completed: boolean,
    tags: Tag[]
}

export interface TaskModalInputs {
    title: string,
    description: string,
    actions: TaskAction[],
    obstacles: string,
}

export interface TaskReport {
    startTime: Date,
    endTime: Date,
    title: string,
    description: string,
    actions: TaskAction[],
    obstacles: string,
}