var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react-addons-css-transition-group", "react", "marked", "react-dnd", "./checkList", "./constants"], function (require, exports, CSSTransitionGroup, React, marked, react_dnd_1, checkList_1, constants_1) {
    "use strict";
    var cardDragSpec = {
        beginDrag: function (props) {
            return {
                id: props.id
            };
        } };
    var collectDrag = function (connect, monitor) {
        return {
            connectDragSource: connect.dragSource()
        };
    };
    var Card = (function (_super) {
        __extends(Card, _super);
        function Card() {
            _super.call(this);
            var xx = constants_1.Constants.CARD;
            this.state = {
                showDetails: false
            };
        }
        Card.prototype.toggleDetails = function () {
            this.setState({ showDetails: !this.state.showDetails });
        };
        Card.prototype.render = function () {
            var connectDragSource = this.props.connectDragSource;
            var cardDetails;
            if (this.state.showDetails) {
                cardDetails = (<div className="card_details">
                    <span dangerouslySetInnerHTML={{ __html: marked(this.props.description) }}/>
                    <checkList_1.CheckList cardId={this.props.id} tasks={this.props.tasks} callbacks={this.props.taskCallbacks}/>
                </div>);
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
            return connectDragSource(<div className="card">
                <div style={sideColor}/>
                <div className={this.state.showDetails ? "card_title card_title--is-open" : "card_title"} onClick={this.toggleDetails.bind(this)}>
                    {this.props.title}</div>
                <CSSTransitionGroup transitionName="toggle" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                    {cardDetails}
                </CSSTransitionGroup>
            </div>);
        };
        return Card;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = react_dnd_1.DragSource("Card", cardDragSpec, collectDrag)(Card);
});
//# sourceMappingURL=card.jsx.map