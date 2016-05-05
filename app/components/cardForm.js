var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    var CardForm = (function (_super) {
        __extends(CardForm, _super);
        function CardForm() {
            _super.apply(this, arguments);
        }
        CardForm.prototype.handleChange = function (field, e) {
            this.props.handleChange(field, e.target.value);
        };
        CardForm.prototype.handleClose = function (e) {
            e.preventDefault();
            this.props.handleClose(e);
        };
        CardForm.prototype.render = function () {
            return (React.createElement("div", null, React.createElement("div", {className: "card big"}, React.createElement("form", {onSubmit: this.props.handleSubmit.bind(this)}, React.createElement("input", {type: "text", value: this.props.draftCard.title, onChange: this.handleChange.bind(this, "title"), placeholder: "Title", required: true, autoFocus: true}), React.createElement("textarea", {value: this.props.draftCard.description, onChange: this.handleChange.bind(this, "description"), placeholder: "Description", required: true}), React.createElement("label", {htmlFor: "status"}, "Status"), React.createElement("select", {id: "status", value: this.props.draftCard.status, onChange: this.handleChange.bind(this, "status")}, React.createElement("option", {value: "todo"}, "To Do"), React.createElement("option", {value: "in-progress"}, "In Progress"), React.createElement("option", {value: "done"}, "Done")), React.createElement("br", null), React.createElement("label", {htmlFor: "color"}, "Color"), React.createElement("input", {id: "color", value: this.props.draftCard.color, onChange: this.handleChange.bind(this, "color"), type: "color", defaultValue: "#ff0000"}), React.createElement("div", {className: "actions"}, React.createElement("button", {type: "submit"}, this.props.buttonLabel)))), React.createElement("div", {className: "overlay", onClick: this.handleClose.bind(this)})));
        };
        return CardForm;
    }(React.Component));
    exports.CardForm = CardForm;
});
//# sourceMappingURL=cardForm.js.map