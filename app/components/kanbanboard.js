var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "./list", "react-dnd", "react-dnd-html5-backend", "react-router", "lodash"], function (require, exports, React, list_1, react_dnd_1, react_dnd_html5_backend_1, react_router_1, _) {
    "use strict";
    var KanbanBoard = (function (_super) {
        __extends(KanbanBoard, _super);
        function KanbanBoard() {
            _super.apply(this, arguments);
        }
        KanbanBoard.prototype.render = function () {
            var cardModal = this.props.children && React.cloneElement(this.props.children, {
                cards: this.props.cards
            });
            var cards = this.props.cards;
            return (React.createElement("div", {className: "app"}, React.createElement(react_router_1.Link, {to: "/new", className: "float-button"}, "+"), React.createElement(list_1.default, {id: "todo", title: "To Do", cards: _.filter(cards, function (card) { return card.status === "todo"; })}), React.createElement(list_1.default, {id: "in-progress", title: "In Progress", cards: _.filter(cards, function (card) { return card.status === "in-progress"; })}), React.createElement(list_1.default, {id: "done", title: "Done", cards: _.filter(cards, function (card) { return card.status === "done"; })}), cardModal));
        };
        return KanbanBoard;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = react_dnd_1.DragDropContext(react_dnd_html5_backend_1.default)(KanbanBoard);
});
//# sourceMappingURL=kanbanboard.js.map