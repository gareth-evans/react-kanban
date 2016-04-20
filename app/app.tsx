import * as React from "react";
import {render} from "react-dom";
import {Router, Route, Link, IndexRoute} from "react-router";

import {Card} from "./model/Card";
import {KanbanBoardContainer} from "./kanbanboardContainer";
import KanbanBoard from "./kanbanboard";
import {NewCard} from "./newCard";
import {EditCard} from "./editCard";

render(
    <Router>
        <Route component={KanbanBoardContainer}>
            <Route path="/" component={KanbanBoard}>
                <Route path="new" component={NewCard} />
                <Route path="edit/:card_id" component={EditCard} />
            </Route>
        </Route>
    </Router>, document.getElementById("root"));