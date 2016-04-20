import {Task} from "./Task";

export interface Card {
    id: number;
    title: string;
    description: string;
    color: string;
    status: string;
    tasks: Task[];
}