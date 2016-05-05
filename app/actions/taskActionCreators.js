define(["require", "exports", "../appDispatcher", "../constants", "../api/kanbanApi"], function (require, exports, appDispatcher_1, constants_1, kanbanApi_1) {
    "use strict";
    var TaskActionCreators = {
        addTask: function (cardId, task) {
            appDispatcher_1.default.dispatchAsync(kanbanApi_1.default.addTask(cardId, task), {
                request: constants_1.Constants.CREATE_TASK,
                success: constants_1.Constants.CREATE_TASK_SUCCESS,
                failure: constants_1.Constants.CREATE_TASK_ERROR
            }, { cardId: cardId, task: task });
        },
        deleteTask: function (cardId, task, taskIndex) {
            appDispatcher_1.default.dispatchAsync(kanbanApi_1.default.deleteTask(cardId, task), {
                request: constants_1.Constants.DELETE_TASK,
                success: constants_1.Constants.DELETE_TASK_SUCCESS,
                failure: constants_1.Constants.DELETE_TASK_ERROR
            }, { cardId: cardId, task: task, taskIndex: taskIndex });
        },
        toggleTask: function (cardId, task, taskIndex) {
            appDispatcher_1.default.dispatchAsync(kanbanApi_1.default.toggleTask(cardId, task), {
                request: constants_1.Constants.TOGGLE_TASK,
                success: constants_1.Constants.TOGGLE_TASK_SUCCESS,
                failure: constants_1.Constants.TOGGLE_TASK_ERROR
            }, { cardId: cardId, task: task, taskIndex: taskIndex });
        }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = TaskActionCreators;
});
//# sourceMappingURL=taskActionCreators.js.map