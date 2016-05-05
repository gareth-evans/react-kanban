var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "flux/utils", "../actions/cardActionCreators", "../stores/cardStore"], function (require, exports, React, utils_1, cardActionCreators_1, cardStore_1) {
    "use strict";
    var api_url = "http://kanbanapi.pro-react.com";
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "graz36m");
    var KanbanBoardContainer = (function (_super) {
        __extends(KanbanBoardContainer, _super);
        function KanbanBoardContainer() {
            _super.apply(this, arguments);
        }
        KanbanBoardContainer.prototype.componentDidMount = function () {
            cardActionCreators_1.default.fetchCards();
        };
        KanbanBoardContainer.prototype.render = function () {
            var style = { height: "100%" };
            var kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
                cards: this.state.cards
            });
            return React.createElement("div", {style: style}, kanbanBoard);
        };
        KanbanBoardContainer.getStores = function () { return ([cardStore_1.default]); };
        KanbanBoardContainer.calculateState = function (prevState) { return ({
            cards: cardStore_1.default.getState()
        }); };
        return KanbanBoardContainer;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = utils_1.Container.create(KanbanBoardContainer);
});
//# sourceMappingURL=kanbanboardContainer.js.map