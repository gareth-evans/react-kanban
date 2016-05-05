var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "./card", "react-dnd", "../constants", "../actions/cardActionCreators"], function (require, exports, React, card_1, react_dnd_1, constants_1, cardActionCreators_1) {
    "use strict";
    var listTargetSpec = {
        hover: function (props, monitor) {
            var dragged = monitor.getItem();
            cardActionCreators_1.default.updateCardStatus(dragged.id, props.id);
        }
    };
    var collect = function (connect, monitor) {
        return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver()
        };
    };
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            _super.apply(this, arguments);
        }
        List.prototype.render = function () {
            var _a = this.props, connectDropTarget = _a.connectDropTarget, isOver = _a.isOver;
            var cards = this.props.cards.map(function (card) {
                return (React.createElement("div", {key: card.id}, React.createElement(card_1.default, {id: card.id, key: card.id, title: card.title, description: card.description, color: card.color, tasks: card.tasks, status: card.status, showDetails: card.showDetails})));
            });
            return connectDropTarget(React.createElement("div", {className: "list"}, React.createElement("h1", null, this.props.title), cards));
        };
        return List;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = react_dnd_1.DropTarget(constants_1.Constants.CARD, listTargetSpec, collect)(List);
});
//# sourceMappingURL=list.js.map