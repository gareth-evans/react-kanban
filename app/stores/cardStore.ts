import AppDispatcher from "../appDispatcher";
import {Constants} from "../constants";
import {ReduceStore} from "flux/utils";
import * as Model from "../model/model";
import update = require("react-addons-update");
import * as _ from "lodash";

class CardStore extends ReduceStore<Model.Card[]> {
    _state: Model.Card[];

    getInitialState() {
        return [];
    }
    reduce(state, action) {
        let cardIndex: number, taskIndex: number;

        switch (action.type) {
            case Constants.FETCH_CARDS_SUCCESS:
                return action.payload.response;
            case Constants.CREATE_CARD:
                return update(this.getState(), {
                    $push: [action.payload.card]
                });
            case Constants.CREATE_CARD_SUCCESS:
                cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    [cardIndex]: { id: { $set: action.payload.response.id } }
                });
            case Constants.CREATE_CARD_ERROR:
                cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    $splice: [[cardIndex, 1]]
                });
            case Constants.UPDATE_CARD:
                cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    [cardIndex] : { $set: action.payload.draftCard }
                });
            case Constants.UPDATE_CARD_ERROR:
                cardIndex = this.getCardIndex(action.payload.card.id);
                return update(this.getState(), {
                    [cardIndex]: { $set : action.payload.card }
                });
            case Constants.UPDATE_CARD_POSITION:
                if (action.payload.cardId !== action.payload.afterId) {
                    cardIndex = this.getCardIndex(action.payload.cardId);
                    let card = this.getState()[cardIndex];
                    let afterIndex = this.getCardIndex(action.payload.afterId);
                    return update(this.getState(), {
                       $splice: [
                           [cardIndex, 1],
                           [afterIndex, 0, card]
                       ]
                    });
                }
                return state;
            case Constants.UPDATE_CARD_STATUS:
                cardIndex = this.getCardIndex(action.payload.cardId);
                let s = this._state;
                if (s[cardIndex] && s[cardIndex].status !== action.payload.listId) {
                    return update(this.getState(), {
                        [cardIndex]: { status: {$set: action.payload.listId }}
                    });
                }
                return state;
            case Constants.PERSIST_CARD_DRAG_ERROR:
                cardIndex = this.getCardIndex(action.payload.cardProps.Id);
                return update(this.getState(), {
                    [cardIndex]: {
                        status: { $set: action.payload.cardProps.status }
                    }
                });
            case Constants.CREATE_TASK:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: { $push: [action.payload.task] }
                    }
                });
            case Constants.CREATE_TASK_SUCCESS:
                cardIndex = this.getCardIndex(action.payload.cardId);
                taskIndex = _.findIndex(this.getState()[cardIndex].tasks, (task) => task.id === action.payload.task.id);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            [taskIndex]: { id: { $set: action.payload.response.id }}
                        }
                    }
                });
            case Constants.CREATE_TASK_ERROR:
                cardIndex = this.getCardIndex(action.payload.cardId);
                taskIndex = _.findIndex(this.getState()[cardIndex].tasks, (task) => task.id === action.payload.task.id);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: { $splice: [[taskIndex, 1]]}
                    }
                });
            case Constants.DELETE_TASK:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        $splice: [[action.payload.taskIndex, 1]]
                    }
                });
            case Constants.DELETE_TASK_ERROR:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: { $splice: [[action.payload.taskIndex, 0, action.payload.task]]}
                    }
                });
            case Constants.TOGGLE_TASK:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            [action.payload.taskIndex]: { done: { $apply: (done) => done }}
                        }
                    }
                });
            case Constants.TOGGLE_TASK_ERROR:
                cardIndex = this.getCardIndex(action.payload.cardId);
                return update(this.getState(), {
                    [cardIndex]: {
                        tasks: {
                            [action.payload.taskIndex]: { done: { $apply: (done) => done }}
                        }
                    }
                });
            case Constants.TOGGLE_CARD_DETAILS:
                cardIndex = this.getCardIndex(action.payload.cardId);
                let newState = update(this.getState(), {
                    [cardIndex]: {
                        showDetails: { $apply: currentValue => (currentValue !== false) ? false : true}
                    }
                });
                return newState;
            default:
                return state;
        }
    }
    getCard(id: number): Model.Card {
        return _.find(this._state, (card) => card.id === id);
    }
    getCardIndex(id: number): number {
        return _.findIndex(this._state, (card) => card.id === id);
    }
    persistCardDrag(id: number, status: string, cardIndex: number) {

    }
}

export default new CardStore(AppDispatcher);