import * as Model from "./model/model";

export interface CardCallbacks {
    updateCardStatus(cardId: number, listId: string);
    updateCardPosition(cardId: number, afterId: number);
    persistCardDrag(cardId: number, status: string);
    addCard(newCard: Model.Card);
    updateCard(card: Model.Card);
}