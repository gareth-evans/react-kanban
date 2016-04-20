export interface TaskCallbacks {
    add: (cardId: number, name: string) => void;
    delete: (cardId: number, taskId: number, taskIndex: number) => void;
    toggle: (cardId: number, taskId: number, taskIndex: number) => void;
}