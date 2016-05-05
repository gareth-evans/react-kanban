import "whatwg-fetch";
import * as Model from "../model/model";

class KanbanApi {
    api_url: string;
    headers: Headers;
    constructor() {
        this.api_url = "http://kanbanapi.pro-react.com";
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json");
        this.headers.append("Authorization", "graz26m");
    }

    fetchCards() {
        return fetch(this.api_url + "/cards", { headers: this.headers })
            .then((response) => response.json());
    }

    addCard(card: Model.Card): Promise<Response> {
        return fetch(this.api_url + "/cards", {
            method: "post",
            headers: this.headers,
            body: JSON.stringify(card)
        })
        .then(response => response.json());
    }

    updateCard(card: Model.Card, draftCard: Model.Card): Promise<Response> {
        return fetch(this.api_url + "/cards/" + card.id, {
            method: "put",
            headers: this.headers,
            body: JSON.stringify(draftCard)
        });
    }

    persistCardDrag(cardId: number, status: string, cardIndex: number): Promise<Response> {
        return fetch(this.api_url + "/cards/" + cardId, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify({ status: status, row_order_position: cardIndex })
        });
    }

    addTask(cardId: number, task: Model.Task): Promise<Response> {
        return fetch(this.api_url + "/cards/" + cardId + "/tasks", {
            method: "post",
            headers: this.headers,
            body: JSON.stringify(task)
        })
            .then((response) => response.json());
    }

    deleteTask(cardId: number, task: Model.Task): Promise<Response> {
        return fetch(this.api_url + "/cards/" + cardId + "/tasks/" + task.id, {
            method: "delete",
            headers: this.headers
        });
    }

    toggleTask(cardId: number, task: Model.Task): Promise<Response> {
        return fetch(this.api_url + "/cards/" + cardId + "/tasks/" + task.id, {
            method: "put",
            headers: this.headers,
            body: JSON.stringify({ done: !task.done })
        });
    }
}

export default new KanbanApi();