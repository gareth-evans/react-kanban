import * as React from "react";
import {render} from "react-dom";
import {Router, Route, Link, IndexRoute} from "react-router";

import {Card} from "./model/Card";
import KanbanBoardContainer from "./components/kanbanboardContainer";
import KanbanBoard from "./components/kanbanboard";
import NewCard from "./components/newCard";
import EditCard from "./components/editCard";

render(
    <Router>
        <Route component={KanbanBoardContainer}>
            <Route path="/" component={KanbanBoard}>
                <Route path="new" component={NewCard} />
                <Route path="edit/:card_id" component={EditCard} />
            </Route>
        </Route>
    </Router>, document.getElementById("root"));