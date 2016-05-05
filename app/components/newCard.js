var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "./cardForm", "../actions/cardActionCreators", "../stores/draftStore", "flux/utils"], function (require, exports, React, cardForm_1, cardActionCreators_1, draftStore_1, utils_1) {
    "use strict";
    var NewCard = (function (_super) {
        __extends(NewCard, _super);
        function NewCard() {
            _super.apply(this, arguments);
        }
        NewCard.prototype.handleChange = function (field, value) {
            cardActionCreators_1.default.updateDraft(field, value);
        };
        NewCard.prototype.handleSubmit = function (e) {
            e.preventDefault();
            cardActionCreators_1.default.addCard(this.state.draft);
            this.props.history.pushState(null, "/");
        };
        NewCard.prototype.handleClose = function (e) {
            this.props.history.pushState(null, "/");
        };
        NewCard.prototype.componentDidMount = function () {
            setTimeout(function () { return cardActionCreators_1.default.createDraft(); }, 0);
        };
        NewCard.prototype.render = function () {
            return (React.createElement(cardForm_1.CardForm, {draftCard: this.state.draft, buttonLabel: "Create Card", handleChange: this.handleChange.bind(this), handleClose: this.handleClose.bind(this), handleSubmit: this.handleSubmit.bind(this)}));
        };
        NewCard.getStores = function () { return ([draftStore_1.default]); };
        NewCard.calculateState = function (prevState) { return ({
            draft: draftStore_1.default.getState()
        }); };
        return NewCard;
    }(React.Component));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = utils_1.Container.create(NewCard);
});
//# sourceMappingURL=newCard.js.map