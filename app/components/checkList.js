var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "../actions/taskActionCreators"], function (require, exports, React, taskActionCreators_1) {
    "use strict";
    var CheckList = (function (_super) {
        __extends(CheckList, _super);
        function CheckList() {
            _super.apply(this, arguments);
        }
        CheckList.prototype.checkInputKeyPress = function (evt) {
            if (evt.key === "Enter") {
                taskActionCreators_1.default.addTask(this.props.cardId, evt.target.value);
                evt.target.value = "";
            }
        };
        CheckList.prototype.render = function () {
            var _this = this;
            var tasks = this.props.tasks.map(function (task, taskIndex) {
                return (React.createElement("li", {className: "checklist_task", key: task.id}, React.createElement("input", {type: "checkbox", checked: task.done, onChange: taskActionCreators_1.default.toggleTask.bind(null, _this.props.cardId, task.id, taskIndex)}), task.name, React.createElement("a", {href: "#", className: "checklist_task--remove", onClick: taskActionCreators_1.default.deleteTask.bind(null, _this.props.cardId, task.id, taskIndex)})));
            });
            return (React.createElement("div", {className: "checklist"}, React.createElement("ul", null, tasks), React.createElement("input", {type: "text", className: "checklist--add-task", placeholder: "Type then hit Enter to add a task", onKeyPress: this.checkInputKeyPress.bind(this)})));
        };
        return CheckList;
    }(React.Component));
    exports.CheckList = CheckList;
});
//# sourceMappingURL=checkList.js.map