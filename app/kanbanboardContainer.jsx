var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "react", "lodash", "./kanbanboard"], function (require, exports, React, _, kanbanboard_1) {
    "use strict";
    var api_url = "http://kanbanapi.pro-react.com";
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "graz36m");
    var KanbanBoardContainer = (function (_super) {
        __extends(KanbanBoardContainer, _super);
        function KanbanBoardContainer() {
            _super.call(this);
            this.state = {
                cards: []
            };
        }
        KanbanBoardContainer.prototype.componentDidMount = function () {
            var _this = this;
            fetch(api_url + "/cards", { headers: headers })
                .then(function (response) { return response.json(); })
                .then(function (responseData) {
                _this.setState({ cards: responseData });
            })
                .catch(function (error) {
                console.log("Error fetching and parsing data", error);
            });
        };
        KanbanBoardContainer.prototype.addTask = function (cardId, name) {
            var _this = this;
            var prevState = this.state;
            var cardIndex = _.findIndex(this.state.cards, function (card) { return card.id === cardId; });
            var newTask = { id: Date.now(), name: name, done: false };
            var nextState = React.addons.update(this.state.cards, (_a = {},
                _a[cardIndex] = {
                    tasks: {
                        $push: [newTask]
                    }
                },
                _a
            ));
            this.setState({ cards: nextState });
            fetch(api_url + "/cards/" + cardId + "/tasks", {
                method: "post",
                headers: headers,
                body: JSON.stringify(newTask)
            })
                .then(function (response) {
                if (!response.ok) {
                    throw new Error("failed");
                }
                return response.json();
            })
                .then(function (responseData) {
                newTask.id = responseData.id,
                    _this.setState({ cards: nextState });
            })
                .catch(function (error) {
                console.log("Error adding task", error);
                _this.setState(prevState);
            });
            var _a;
        };
        KanbanBoardContainer.prototype.deleteTask = function (cardId, taskId, taskIndex) {
            var _this = this;
            var prevState = this.state;
            var cardIndex = _.findIndex(this.state.cards, function (card) { return card.id === cardId; });
            var nextState = React.addons.update(this.state.cards, (_a = {},
                _a[cardIndex] = {
                    tasks: { $splice: [[taskIndex, 1]] }
                },
                _a
            ));
            this.setState({ cards: nextState });
            fetch(api_url + "/cards/" + cardId + "/tasks/" + taskId, {
                method: "delete",
                headers: headers
            })
                .then(function (response) {
                if (!response.ok) {
                    throw new Error("failed");
                }
            })
                .catch(function (error) {
                console.log("Error deleting task", error);
                _this.setState(prevState);
            });
            var _a;
        };
        KanbanBoardContainer.prototype.toggleTask = function (cardId, taskId, taskIndex) {
            var _this = this;
            var prevState = this.state;
            var cardIndex = _.findIndex(this.state.cards, function (card) { return card.id === cardId; });
            var newDoneValue;
            var nextState = React.addons.update(this.state.cards, (_a = {},
                _a[cardIndex] = {
                    tasks: (_b = {},
                        _b[taskIndex] = {
                            done: {
                                $apply: function (done) {
                                    newDoneValue = !done;
                                    return newDoneValue;
                                }
                            }
                        },
                        _b
                    )
                },
                _a
            ));
            this.setState({ cards: nextState });
            fetch(api_url + "/cards/" + cardId + "/tasks/" + taskId, {
                method: "put",
                headers: headers,
                body: JSON.stringify({ done: newDoneValue })
            })
                .then(function (response) {
                if (!response.ok) {
                    throw new Error("failed");
                }
            })
                .catch(function (error) {
                console.log("Error updating task", error);
                _this.setState(prevState);
            });
            var _a, _b;
        };
        KanbanBoardContainer.prototype.updateCardStatus = function (cardId, listId) {
            var cardIndex = _.findIndex(this.state.cards, function (card) { return cardId === cardId; });
            var card = this.state.cards[cardIndex];
            if (card.status !== listId) {
                this.setState(React.addons.update(this.state, {
                    cards: (_a = {},
                        _a[cardIndex] = {
                            status: { $set: listId }
                        },
                        _a
                    )
                }));
            }
            var _a;
        };
        KanbanBoardContainer.prototype.updateCardPosition = function (cardId, afterId) {
            if (cardId !== afterId) {
                var cardIndex = _.findIndex(this.state.cards, function (card) { return card.id === cardId; });
                var card = this.state.cards[cardIndex];
                var afterIndex = _.findIndex(this.state.cards, function (card) { return card.id === afterId; });
                this.setState(React.addons.update(this.state, {
                    cards: {
                        $splice: [
                            [cardIndex, 1],
                            [afterIndex, 0, card]
                        ]
                    }
                }));
            }
        };
        KanbanBoardContainer.prototype.render = function () {
            return <kanbanboard_1.default cards={this.state.cards} taskCallbacks={{
                add: this.addTask.bind(this),
                delete: this.deleteTask.bind(this),
                toggle: this.toggleTask.bind(this)
            }} cardCallbacks={{
                updateCardStatus: this.updateCardStatus.bind(this),
                updateCardPosition: this.updateCardPosition.bind(this)
            }}/>;
        };
        return KanbanBoardContainer;
    }(React.Component));
    exports.KanbanBoardContainer = KanbanBoardContainer;
});
//# sourceMappingURL=kanbanboardContainer.jsx.map