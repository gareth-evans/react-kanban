import AppDispatcher from "../appDispatcher";
import {Constants} from "../constants";
import KanbanApi from "../api/kanbanApi";
import * as Model from "../model/model";
import {throttle} from "../utils";
import CardStore from "../stores/cardStore";

let CardActionCreators = {
    fetchCards() {
        let x = AppDispatcher;
        AppDispatcher.dispatchAsync(KanbanApi.fetchCards(), {
            request: Constants.FETCH_CARDS,
            success: Constants.FETCH_CARDS_SUCCESS,
            failure: Constants.FETCH_CARDS_ERROR
        });
    },
    addCard(card: Model.Card) {
        AppDispatcher.dispatchAsync(KanbanApi.addCard(card), {
            request: Constants.CREATE_CARD,
            success: Constants.CREATE_CARD_SUCCESS,
            failure: Constants.CREATE_CARD_ERROR
        }, { card });
    },
    updateCard(card: Model.Card, draftCard: Model.Card) {
        AppDispatcher.dispatchAsync(KanbanApi.updateCard(card, draftCard), {
            request: Constants.UPDATE_CARD,
            success: Constants.UPDATE_CARD_SUCCESS,
            failure: Constants.UPDATE_CARD_ERROR
        }, { card, draftCard });
    },
    updateCardStatus: throttle((cardId: number, listId: string) => {
        AppDispatcher.dispatch({
            type: Constants.UPDATE_CARD_STATUS,
            payload: { cardId, listId }
        });
    }, 500) as (cardId: number, listId: string) => void,
    updateCardPosition: throttle((cardId, afterId) => {
        AppDispatcher.dispatch({
            type: Constants.UPDATE_CARD_POSITION,
            payload: { cardId, afterId }
        });
    }, 1000) as (cardId: number, afterId: number) => void,
    persistCardDrag(cardProps) {
        let card = CardStore.getCard(cardProps.id);
        let cardIndex = CardStore.getCardIndex(cardProps.id);
        AppDispatcher.dispatchAsync(KanbanApi.persistCardDrag(card.id, card.status, cardIndex), {
            request: Constants.PERSIST_CARD_DRAG,
            success: Constants.PERSIST_CARD_DRAG_SUCCESS,
            failure: Constants.PERSIST_CARD_DRAG_ERROR
        }, {cardProps});
    },
    toggleCardDetails(cardId: number) {
        AppDispatcher.dispatch({
            type: Constants.TOGGLE_CARD_DETAILS,
            payload: {cardId}
        });
    },
    createDraft(card: Model.Card) {
        AppDispatcher.dispatch({
            type: Constants.CREATE_DRAFT,
            payload: {card}
        });
    },
    updateDraft(field: string, value: string) {
        AppDispatcher.dispatch({
            type: Constants.UPDATE_DRAFT,
            payload: {field, value}
        });
    }
};

export default CardActionCreators;
