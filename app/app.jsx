define(["require", "exports", "react", "react-dom", "./kanbanboardContainer"], function (require, exports, React, react_dom_1, kanbanboardContainer_1) {
    "use strict";
    ;
    ;
    var cardsList = [
        {
            id: 1,
            title: "Read the book",
            description: "I should read the whole book",
            color: "#bd8d31",
            status: "in-progress",
            tasks: []
        },
        {
            id: 2,
            title: "Write some code",
            description: "Code along with the samples in the book at [github](https://github.com/proreact)",
            color: "#3a7e28",
            status: "todo",
            tasks: [
                {
                    id: 1,
                    name: "ContactList Example",
                    done: true
                },
                {
                    id: 2,
                    name: "Kanban Example",
                    done: false
                },
                {
                    id: 3,
                    name: "My own experiments",
                    done: false
                }
            ]
        }
    ];
    react_dom_1.render(<kanbanboardContainer_1.KanbanBoardContainer cards={cardsList}/>, document.getElementById("root"));
});
//# sourceMappingURL=app.jsx.map