var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../appDispatcher", "../constants", "flux/utils", "react-addons-update"], function (require, exports, appDispatcher_1, constants_1, utils_1, update) {
    "use strict";
    var defaultDraft = function () {
        return {
            id: Date.now(),
            title: "",
            description: "",
            status: "todo",
            color: "#c9c9c9",
            tasks: []
        };
    };
    var DraftStore = (function (_super) {
        __extends(DraftStore, _super);
        function DraftStore() {
            _super.apply(this, arguments);
        }
        DraftStore.prototype.getInitialState = function () {
            return {};
        };
        DraftStore.prototype.reduce = function (state, action) {
            switch (action.type) {
                case constants_1.Constants.CREATE_DRAFT:
                    if (action.payload.card) {
                        return update(this.getState(), {
                            $set: action.payload.card
                        });
                    }
                    else {
                        return defaultDraft();
                    }
                case constants_1.Constants.UPDATE_DRAFT:
                    return update(this.getState(), (_a = {},
                        _a[action.payload.field] = {
                            $set: action.payload.value
                        },
                        _a
                    ));
                default:
                    return state;
            }
            var _a;
        };
        return DraftStore;
    }(utils_1.ReduceStore));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = new DraftStore(appDispatcher_1.default);
});
//# sourceMappingURL=draftStore.js.map