var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "./cardForm", "../stores/cardStore", "../actions/cardActionCreators", "../stores/draftStore", "flux/utils", "lodash"], function (require, exports, React, cardForm_1, cardStore_1, cardActionCreators_1, draftStore_1, utils_1) {
    "use strict";
    var EditCard = (function (_super) {
        __extends(EditCard, _super);
        function EditCard() {
            _super.apply(this, arguments);
        }
        EditCard.prototype.handleChange = function (field, value) {
            cardActionCreators_1.default.updateDraft(field, value);
        };
        EditCard.prototype.handleSubmit = function (e) {
            e.preventDefault();
            cardActionCreators_1.default.updateCard(cardStore_1.default.getCard(parseInt(this.props.params.card_id)), this.state.draft);
            this.props.history.pushState(null, "/");
        };
        EditCard.prototype.handleClose = function (e) {
            this.props.history.pushState(null, "/");
        };
        EditCard.prototype.componentDidMount = function () {
            var _this = this;
            setTimeout(function () {
                cardActionCreators_1.default.createDraft(cardStore_1.default.getCard(parseInt(_this.props.params.card_id)));
            }, 0);
        };
        EditCard.prototype.render = function () {
            return (React.createElement(cardForm_1.CardForm, {buttonLabel: "Edit Card", draftCard: this.state.draft, handleChange: this.handleChange.bind(this), handleSubmit: this.handleSubmit.bind(this), handleClose: this.handleClose.bind(this)}));
        };
        EditCard.getStores = function () { return ([draftStore_1.default]); };
        EditCard.calculateState = function (prevState) {
            return {
                draft: draftStore_1.default.getState()
            };
        };
        return EditCard;
    }(React.Component));
    exports.EditCard = EditCard;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = utils_1.Container.create(EditCard);
});
//# sourceMappingURL=editCard.js.map