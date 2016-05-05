define(["require", "exports", "../appDispatcher", "../constants", "../api/kanbanApi", "../utils", "../stores/cardStore"], function (require, exports, appDispatcher_1, constants_1, kanbanApi_1, utils_1, cardStore_1) {
    "use strict";
    var CardActionCreators = {
        fetchCards: function () {
            var x = appDispatcher_1.default;
            appDispatcher_1.default.dispatchAsync(kanbanApi_1.default.fetchCards(), {
                request: constants_1.Constants.FETCH_CARDS,
                success: constants_1.Constants.FETCH_CARDS_SUCCESS,
                failure: constants_1.Constants.FETCH_CARDS_ERROR
            });
        },
        addCard: function (card) {
            appDispatcher_1.default.dispatchAsync(kanbanApi_1.default.addCard(card), {
                request: constants_1.Constants.CREATE_CARD,
                success: constants_1.Constants.CREATE_CARD_SUCCESS,
                failure: constants_1.Constants.CREATE_CARD_ERROR
            }, { card: card });
        },
        updateCard: function (card, draftCard) {
            appDispatcher_1.default.dispatchAsync(kanbanApi_1.default.updateCard(card, draftCard), {
                request: constants_1.Constants.UPDATE_CARD,
                success: constants_1.Constants.UPDATE_CARD_SUCCESS,
                failure: constants_1.Constants.UPDATE_CARD_ERROR
            }, { card: card, draftCard: draftCard });
        },
        updateCardStatus: utils_1.throttle(function (cardId, listId) {
            appDispatcher_1.default.dispatch({
                type: constants_1.Constants.UPDATE_CARD_STATUS,
                payload: { cardId: cardId, listId: listId }
            });
        }, 500),
        updateCardPosition: utils_1.throttle(function (cardId, afterId) {
            appDispatcher_1.default.dispatch({
                type: constants_1.Constants.UPDATE_CARD_POSITION,
                payload: { cardId: cardId, afterId: afterId }
            });
        }, 1000),
        persistCardDrag: function (cardProps) {
            var card = cardStore_1.default.getCard(cardProps.id);
            var cardIndex = cardStore_1.default.getCardIndex(cardProps.id);
            appDispatcher_1.default.dispatchAsync(kanbanApi_1.default.persistCardDrag(card.id, card.status, cardIndex), {
                request: constants_1.Constants.PERSIST_CARD_DRAG,
                success: constants_1.Constants.PERSIST_CARD_DRAG_SUCCESS,
                failure: constants_1.Constants.PERSIST_CARD_DRAG_ERROR
            }, { cardProps: cardProps });
        },
        toggleCardDetails: function (cardId) {
            appDispatcher_1.default.dispatch({
                type: constants_1.Constants.TOGGLE_CARD_DETAILS,
                payload: { cardId: cardId }
            });
        },
        createDraft: function (card) {
            appDispatcher_1.default.dispatch({
                type: constants_1.Constants.CREATE_DRAFT,
                payload: { card: card }
            });
        },
        updateDraft: function (field, value) {
            appDispatcher_1.default.dispatch({
                type: constants_1.Constants.UPDATE_DRAFT,
                payload: { field: field, value: value }
            });
        }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = CardActionCreators;
});
//# sourceMappingURL=cardActionCreators.js.map