import * as React from "react";
import * as _ from "lodash";
import update = require("react-addons-update");
import {throttle} from "./utils";

import KanbanBoard from "./kanbanboard";
import * as Model from "./model/model";
import {Task} from "./model/model";

const api_url = "http://kanbanapi.pro-react.com";

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Authorization", "graz36m");

interface Props {
    cards: Model.Card[];
    children: any;
}

interface State {
    cards: Model.Card[];
}

export class KanbanBoardContainer extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            cards: []
        };
        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
        this.updateCardPosition = throttle(this.updateCardPosition, 10000);
    }

    componentDidMount() {
        fetch(api_url + "/cards", { headers: headers })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({ cards: responseData });
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            });
    }

    addTask(cardId: number, name: string) {
        let prevState = this.state;
        let cardIndex = _.findIndex(this.state.cards, (card) => card.id === cardId);
        let newTask: Task = { id: Date.now(), name: name, done: false };
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    $push: [newTask]
                }
            }
        });

        this.setState({ cards: nextState });

        fetch(api_url + "/cards/" + cardId + "/tasks", {
            method: "post",
            headers: headers,
            body: JSON.stringify(newTask)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("failed");
                }
                return response.json();
            })
            .then((responseData) => {
                newTask.id = responseData.id,
                    this.setState({ cards: nextState });
            })
            .catch((error) => {
                console.log("Error adding task", error);
                this.setState(prevState);
            });
    }

    deleteTask(cardId: number, taskId: number, taskIndex: number) {
        let prevState = this.state;
        let cardIndex = _.findIndex(this.state.cards, (card) => card.id === cardId);
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: { $splice: [[taskIndex, 1]] }
            }
        });

        this.setState({ cards: nextState });

        fetch(api_url + "/cards/" + cardId + "/tasks/" + taskId, {
            method: "delete",
            headers: headers
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("failed");
                }
            })
            .catch((error) => {
                console.log("Error deleting task", error);
                this.setState(prevState);
            });
    }

    toggleTask(cardId: number, taskId: number, taskIndex: number) {
        let prevState = this.state;
        let cardIndex = _.findIndex(this.state.cards, (card) => card.id === cardId);
        let newDoneValue;

        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (done) => {
                                newDoneValue = !done;
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        });

        this.setState({ cards: nextState });

        fetch(api_url + "/cards/" + cardId + "/tasks/" + taskId, {
            method: "put",
            headers: headers,
            body: JSON.stringify({ done: newDoneValue })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("failed");
                }
            })
            .catch((error) => {
                console.log("Error updating task", error);
                this.setState(prevState);
            });
    }

    addCard(card: Model.Card) {
        let previousState = this.state;
        if (card.id == null) {
            card = update(card, { id: { $set: Date.now } });
        }
        let nextState = update(this.state.cards, { $push: [card] });
        this.setState({ cards: nextState });

        fetch(api_url + "/cards", {
            method: "post",
            headers: headers,
            body: JSON.stringify(card)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    throw new Error("Server response was not OK");
                }
            })
            .then((responseData) => {
                card.id = responseData.id;
                this.setState({ cards: nextState });
            })
            .catch((error) => this.setState(previousState));
    }

    updateCard(updatedCard: Model.Card) {
        let previousState = this.state;
        let cardIndex = _.findIndex(this.state.cards, (card) => card.id === updatedCard.id);
        let nextState = update(this.state.cards, {
            [cardIndex]: { $set: updatedCard }
        });

        this.setState({ cards: nextState });

        fetch(api_url + "/cards/" + updatedCard.id, {
            method: "put",
            headers: headers,
            body: JSON.stringify(updatedCard)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Response from server was not OK");
                }
            })
            .catch((error) => this.setState(previousState));

    }

    updateCardStatus(cardId: number, listId: string) {
        let cardIndex = _.findIndex(this.state.cards, (card) => card.id === cardId);
        let card = this.state.cards[cardIndex];

        if (card.status !== listId) {
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: { $set: listId }
                    }
                }
            }));
        }
    }

    updateCardPosition(cardId: number, afterId: number) {
        if (cardId !== afterId) {
            let cardIndex = _.findIndex(this.state.cards, (card) => card.id === cardId);
            let card = this.state.cards[cardIndex];
            let afterIndex = _.findIndex(this.state.cards, (card) => card.id === afterId);
            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
    }

    persistCardDrag(cardId: number, status: string) {
        let cardIndex = _.findIndex(this.state.cards, (card) => card.id === cardId);
        let card = this.state.cards[cardIndex];
        fetch(api_url + "/cards/" + cardId, {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({ status: card.status, row_order_position: cardIndex })
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Server response wasn't OK");
                }
            })
            .catch((error) => {
                console.error("Fetch error: " + error);
                this.setState(update(this.state, {
                    cards: {
                        [cardIndex]: { $set: status }
                    }
                })
                );
            });
    }

    render() {
        let style = { height: "100%" };
        let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
            cards: this.state.cards,
            taskCallbacks:
            {
                add: this.addTask.bind(this),
                delete: this.deleteTask.bind(this),
                toggle: this.toggleTask.bind(this)
            },
            cardCallbacks: {
                addCard: this.addCard.bind(this),
                updateCard: this.updateCard.bind(this),
                updateCardStatus: this.updateCardStatus.bind(this),
                updateCardPosition: this.updateCardPosition.bind(this),
                persistCardDrag: this.persistCardDrag.bind(this)
            }
        });

        return <div style={style}>{kanbanBoard}</div>;
    }
}