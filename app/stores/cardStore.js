var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "../appDispatcher", "../constants", "flux/utils", "react-addons-update", "lodash"], function (require, exports, appDispatcher_1, constants_1, utils_1, update, _) {
    "use strict";
    var CardStore = (function (_super) {
        __extends(CardStore, _super);
        function CardStore() {
            _super.apply(this, arguments);
        }
        CardStore.prototype.getInitialState = function () {
            return [];
        };
        CardStore.prototype.reduce = function (state, action) {
            var cardIndex, taskIndex;
            switch (action.type) {
                case constants_1.Constants.FETCH_CARDS_SUCCESS:
                    return action.payload.response;
                case constants_1.Constants.CREATE_CARD:
                    return update(this.getState(), {
                        $push: [action.payload.card]
                    });
                case constants_1.Constants.CREATE_CARD_SUCCESS:
                    cardIndex = this.getCardIndex(action.payload.card.id);
                    return update(this.getState(), (_a = {},
                        _a[cardIndex] = { id: { $set: action.payload.response.id } },
                        _a
                    ));
                case constants_1.Constants.CREATE_CARD_ERROR:
                    cardIndex = this.getCardIndex(action.payload.card.id);
                    return update(this.getState(), {
                        $splice: [[cardIndex, 1]]
                    });
                case constants_1.Constants.UPDATE_CARD:
                    cardIndex = this.getCardIndex(action.payload.card.id);
                    return update(this.getState(), (_b = {},
                        _b[cardIndex] = { $set: action.payload.draftCard },
                        _b
                    ));
                case constants_1.Constants.UPDATE_CARD_ERROR:
                    cardIndex = this.getCardIndex(action.payload.card.id);
                    return update(this.getState(), (_c = {},
                        _c[cardIndex] = { $set: action.payload.card },
                        _c
                    ));
                case constants_1.Constants.UPDATE_CARD_POSITION:
                    if (action.payload.cardId !== action.payload.afterId) {
                        cardIndex = this.getCardIndex(action.payload.cardId);
                        var card = this.getState()[cardIndex];
                        var afterIndex = this.getCardIndex(action.payload.afterId);
                        return update(this.getState(), {
                            $splice: [
                                [cardIndex, 1],
                                [afterIndex, 0, card]
                            ]
                        });
                    }
                    return state;
                case constants_1.Constants.UPDATE_CARD_STATUS:
                    cardIndex = this.getCardIndex(action.payload.cardId);
                    var s = this._state;
                    if (s[cardIndex] && s[cardIndex].status !== action.payload.listId) {
                        return update(this.getState(), (_d = {},
                            _d[cardIndex] = { status: { $set: action.payload.listId } },
                            _d
                        ));
                    }
                    return state;
                case constants_1.Constants.PERSIST_CARD_DRAG_ERROR:
                    cardIndex = this.getCardIndex(action.payload.cardProps.Id);
                    return update(this.getState(), (_e = {},
                        _e[cardIndex] = {
                            status: { $set: action.payload.cardProps.status }
                        },
                        _e
                    ));
                case constants_1.Constants.CREATE_TASK:
                    cardIndex = this.getCardIndex(action.payload.cardId);
                    return update(this.getState(), (_f = {},
                        _f[cardIndex] = {
                            tasks: { $push: [action.payload.task] }
                        },
                        _f
                    ));
                case constants_1.Constants.CREATE_TASK_SUCCESS:
                    cardIndex = this.getCardIndex(action.payload.cardId);
                    taskIndex = _.findIndex(this.getState()[cardIndex].tasks, function (task) { return task.id === action.payload.task.id; });
                    return update(this.getState(), (_g = {},
                        _g[cardIndex] = {
                            tasks: (_h = {},
                                _h[taskIndex] = { id: { $set: action.payload.response.id } },
                                _h
                            )
                        },
                        _g
                    ));
                case constants_1.Constants.CREATE_TASK_ERROR:
                    cardIndex = this.getCardIndex(action.payload.cardId);
                    taskIndex = _.findIndex(this.getState()[cardIndex].tasks, function (task) { return task.id === action.payload.task.id; });
                    return update(this.getState(), (_j = {},
                        _j[cardIndex] = {
                            tasks: { $splice: [[taskIndex, 1]] }
                        },
                        _j
                    ));
                case constants_1.Constants.DELETE_TASK:
                    cardIndex = this.getCardIndex(action.payload.cardId);
                    return update(this.getState(), (_k = {},
                        _k[cardIndex] = {
                            $splice: [[action.payload.taskIndex, 1]]
                        },
                        _k
                    ));
                case constants_1.Constants.DELETE_TASK_ERROR:
                    cardIndex = this.getCardIndex(action.payload.cardId);
                    return update(this.getState(), (_l = {},
                        _l[cardIndex] = {
                            tasks: { $splice: [[action.payload.taskIndex, 0, action.payload.task]] }
                        },
                        _l
                    ));
                case constants_1.Constants.TOGGLE_TASK:
                    cardIndex = this.getCardIndex(action.payload.cardId);
                    return update(this.getState(), (_m = {},
                        _m[cardIndex] = {
                            tasks: (_o = {},
                                _o[action.payload.taskIndex] = { done: { $apply: function (done) { return done; } } },
                                _o
                            )
                        },
                        _m
                    ));
                case constants_1.Constants.TOGGLE_TASK_ERROR:
                    cardIndex = this.getCardIndex(action.payload.cardId);
                    return update(this.getState(), (_p = {},
                        _p[cardIndex] = {
                            tasks: (_q = {},
                                _q[action.payload.taskIndex] = { done: { $apply: function (done) { return done; } } },
                                _q
                            )
                        },
                        _p
                    ));
                case constants_1.Constants.TOGGLE_CARD_DETAILS:
                    cardIndex = this.getCardIndex(action.payload.cardId);
                    var newState = update(this.getState(), (_r = {},
                        _r[cardIndex] = {
                            showDetails: { $apply: function (currentValue) { return (currentValue !== false) ? false : true; } }
                        },
                        _r
                    ));
                    return newState;
                default:
                    return state;
            }
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        };
        CardStore.prototype.getCard = function (id) {
            return _.find(this._state, function (card) { return card.id === id; });
        };
        CardStore.prototype.getCardIndex = function (id) {
            return _.findIndex(this._state, function (card) { return card.id === id; });
        };
        CardStore.prototype.persistCardDrag = function (id, status, cardIndex) {
        };
        return CardStore;
    }(utils_1.ReduceStore));
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = new CardStore(appDispatcher_1.default);
});
//# sourceMappingURL=cardStore.js.map