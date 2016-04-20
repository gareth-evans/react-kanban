var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "./card", "react-dnd", "./constants"], function (require, exports, React, card_1, react_dnd_1, constants_1) {
    "use strict";
    var listTargetSpec = {
        hover: function (props, montior) {
            var draggedId = montior.getItem().Id;
            props.cardCallbacks.updateCardStatus(draggedId, props.id);
        }
    };
    function collect(connect, monitor) {
        return {
            connectDropTarget: connect.dropTarget()
        };
    }
    var List = (function (_super) {
        __extends(List, _super);
        function List() {
            _super.apply(this, arguments);
        }
        List.prototype.render = function () {
            var _this = this;
            var connectDropTarget = this.props.connectDropTarget;
            var cards = this.props.cards.map(function (card) {
                return (<div key={card.id}>
                <card_1.default id={card.id} title={card.title} description={card.description} color={card.color} tasks={card.tasks} taskCallbacks={_this.props.taskCallbacks} cardCallbacks={_this.props.cardCallbacks}/>
                </div>);
            });
            return connectDropTarget(<div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>);
        };
        return List;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = react_dnd_1.DropTarget(constants_1.Constants.CARD, listTargetSpec, collect)(List);
});
//# sourceMappingURL=list.jsx.map