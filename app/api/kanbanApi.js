define(["require", "exports", "whatwg-fetch"], function (require, exports) {
    "use strict";
    var KanbanApi = (function () {
        function KanbanApi() {
            this.api_url = "http://kanbanapi.pro-react.com";
            this.headers = new Headers();
            this.headers.append("Content-Type", "application/json");
            this.headers.append("Authorization", "graz26m");
        }
        KanbanApi.prototype.fetchCards = function () {
            return fetch(this.api_url + "/cards", { headers: this.headers })
                .then(function (response) { return response.json(); });
        };
        KanbanApi.prototype.addCard = function (card) {
            return fetch(this.api_url + "/cards", {
                method: "post",
                headers: this.headers,
                body: JSON.stringify(card)
            })
                .then(function (response) { return response.json(); });
        };
        KanbanApi.prototype.updateCard = function (card, draftCard) {
            return fetch(this.api_url + "/cards/" + card.id, {
                method: "put",
                headers: this.headers,
                body: JSON.stringify(draftCard)
            });
        };
        KanbanApi.prototype.persistCardDrag = function (cardId, status, cardIndex) {
            return fetch(this.api_url + "/cards/" + cardId, {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify({ status: status, row_order_position: cardIndex })
            });
        };
        KanbanApi.prototype.addTask = function (cardId, task) {
            return fetch(this.api_url + "/cards/" + cardId + "/tasks", {
                method: "post",
                headers: this.headers,
                body: JSON.stringify(task)
            })
                .then(function (response) { return response.json(); });
        };
        KanbanApi.prototype.deleteTask = function (cardId, task) {
            return fetch(this.api_url + "/cards/" + cardId + "/tasks/" + task.id, {
                method: "delete",
                headers: this.headers
            });
        };
        KanbanApi.prototype.toggleTask = function (cardId, task) {
            return fetch(this.api_url + "/cards/" + cardId + "/tasks/" + task.id, {
                method: "put",
                headers: this.headers,
                body: JSON.stringify({ done: !task.done })
            });
        };
        return KanbanApi;
    }());
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = new KanbanApi();
});
//# sourceMappingURL=kanbanApi.js.map