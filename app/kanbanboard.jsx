var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "./list", "react-dnd", "react-dnd/modules/backends/HTML5"], function (require, exports, React, list_1, react_dnd_1, HTML5_1) {
    "use strict";
    var KanbanBoard = (function (_super) {
        __extends(KanbanBoard, _super);
        function KanbanBoard() {
            _super.apply(this, arguments);
        }
        KanbanBoard.prototype.render = function () {
            return (<div className="app">
                <list_1.default id="todo" title="To Do" cards={this.props.cards.filter(function (card) { return card.status === "todo"; })} taskCallbacks={this.props.taskCallbacks} cardCallbacks={this.props.cardCallbacks}/>

                <list_1.default id="in-progress" title="In Progress" cards={this.props.cards.filter(function (card) { return card.status === "in-progress"; })} taskCallbacks={this.props.taskCallbacks} cardCallbacks={this.props.cardCallbacks}/>

                <list_1.default id="done" title="Done" cards={this.props.cards.filter(function (card) { return card.status === "done"; })} taskCallbacks={this.props.taskCallbacks} cardCallbacks={this.props.cardCallbacks}/>
            </div>);
        };
        return KanbanBoard;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = react_dnd_1.DragDropContext(HTML5_1.default)(KanbanBoard);
});
//# sourceMappingURL=kanbanboard.jsx.map