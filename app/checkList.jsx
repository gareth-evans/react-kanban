var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    var CheckList = (function (_super) {
        __extends(CheckList, _super);
        function CheckList() {
            _super.apply(this, arguments);
        }
        CheckList.prototype.checkInputKeyPress = function (evt) {
            if (evt.key === "Enter") {
                this.props.callbacks.add(this.props.cardId, evt.target.value);
                evt.target.value = "";
            }
        };
        CheckList.prototype.render = function () {
            var _this = this;
            var tasks = this.props.tasks.map(function (task, taskIndex) {
                return (<li className="checklist_task" key={task.id}>
                    <input type="checkbox" checked={task.done} onChange={_this.props.callbacks.toggle.bind(null, _this.props.cardId, task.id, taskIndex)}/>
                    {task.name}
                    <a href="#" className="checklist_task--remove" onClick={_this.props.callbacks.delete.bind(null, _this.props.cardId, task.id, taskIndex)}/>
                </li>);
            });
            return (<div className="checklist">
                <ul>{tasks}</ul>
                <input type="text" className="checklist--add-task" placeholder="Type then hit Enter to add a task" onKeyPress={this.checkInputKeyPress.bind(this)}/>
            </div>);
        };
        return CheckList;
    }(React.Component));
    exports.CheckList = CheckList;
});
//# sourceMappingURL=checkList.jsx.map