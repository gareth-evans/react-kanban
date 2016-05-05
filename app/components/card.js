var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react-addons-css-transition-group", "react", "marked", "react-dnd", "./checkList", "../constants", "react-router", "../actions/cardActionCreators"], function (require, exports, CSSTransitionGroup, React, marked, react_dnd_1, checkList_1, constants_1, react_router_1, cardActionCreators_1) {
    "use strict";
    var cardDragSpec = {
        beginDrag: function (props) {
            return {
                id: props.id
            };
        },
        endDrag: function (props) {
            cardActionCreators_1.default.persistCardDrag(props);
        }
    };
    var cardDropSpec = {
        hover: function (props, monitor) {
            var draggedId = monitor.getItem().id;
            cardActionCreators_1.default.updateCardPosition(draggedId, props.id);
        }
    };
    var collectDrag = function (connect, monitor) {
        return {
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging()
        };
    };
    var collectDrop = function (connect, monitor) {
        return {
            connectDropTarget: connect.dropTarget()
        };
    };
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card() {
            _super.apply(this, arguments);
        }
        Card.prototype.toggleDetails = function () {
            cardActionCreators_1.default.toggleCardDetails(this.props.id);
        };
        Card.prototype.render = function () {
            var _a = this.props, connectDragSource = _a.connectDragSource, isDragging = _a.isDragging, connectDropTarget = _a.connectDropTarget;
            var cardDetails;
            if (this.props.showDetails !== false) {
                cardDetails = (React.createElement("div", {className: "card_details"}, React.createElement("span", {dangerouslySetInnerHTML: { __html: marked(this.props.description) }}), React.createElement(checkList_1.CheckList, {cardId: this.props.id, tasks: this.props.tasks})));
            }
            var sideColor = {
                position: "absolute",
                zIndex: -1,
                top: 0,
                bottom: 0,
                left: 0,
                width: 8,
                backgroundColor: this.props.color
            };
            var cardStyle = {
                opacity: isDragging ? 0.5 : 1
            };
            return connectDropTarget(connectDragSource(React.createElement("div", {className: "card", style: cardStyle}, React.createElement("div", {style: sideColor}), React.createElement("div", {className: "card__edit"}, React.createElement(react_router_1.Link, {to: "/edit/" + this.props.id}, "✎")), React.createElement("div", {className: this.props.showDetails !== false ? "card_title card_title--is-open" : "card_title", onClick: this.toggleDetails.bind(this)}, this.props.title), React.createElement(CSSTransitionGroup, {transitionName: "toggle", transitionEnterTimeout: 250, transitionLeaveTimeout: 250}, cardDetails))));
        };
        return Card;
    }(React.Component));
    var dragSourceCard = react_dnd_1.DragSource(constants_1.Constants.CARD, cardDragSpec, collectDrag)(Card);
    var dropTargetCard = react_dnd_1.DropTarget(constants_1.Constants.CARD, cardDropSpec, collectDrop)(dragSourceCard);
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = dropTargetCard;
});
//# sourceMappingURL=card.js.map