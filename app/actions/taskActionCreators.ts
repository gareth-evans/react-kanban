import AppDispatcher from "../appDispatcher";
import {Constants} from "../constants";
import KanbanApi from "../api/kanbanApi";
import * as Model from "../model/model";

let TaskActionCreators = {
    addTask(cardId: number, task: Model.Task) {
        AppDispatcher.dispatchAsync(KanbanApi.addTask(cardId, task), {
            request: Constants.CREATE_TASK,
            success: Constants.CREATE_TASK_SUCCESS,
            failure: Constants.CREATE_TASK_ERROR
        }, {cardId, task});
    },

    deleteTask(cardId: number, task: Model.Task, taskIndex: number) {
        AppDispatcher.dispatchAsync(KanbanApi.deleteTask(cardId, task), {
            request: Constants.DELETE_TASK,
            success: Constants.DELETE_TASK_SUCCESS,
            failure: Constants.DELETE_TASK_ERROR
        }, {cardId, task, taskIndex});
    },

    toggleTask(cardId: number, task: Model.Task, taskIndex: number) {
        AppDispatcher.dispatchAsync(KanbanApi.toggleTask(cardId, task), {
            request: Constants.TOGGLE_TASK,
            success: Constants.TOGGLE_TASK_SUCCESS,
            failure: Constants.TOGGLE_TASK_ERROR
        }, {cardId, task, taskIndex});
    }
};

export default TaskActionCreators;
