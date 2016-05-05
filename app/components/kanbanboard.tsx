import * as React from "react";
import {Card} from "../model/model";
import List from "./list";
import {Search} from "./search";
import {TaskCallbacks} from "../taskCallbacks";
import {CardCallbacks} from "../cardCallbacks";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {Link} from "react-router";
import * as _ from "lodash";

interface Props {
    cards: Card[];
    children: any;
}

class KanbanBoard extends React.Component<Props, any> {
    render() {
        let cardModal = this.props.children && React.cloneElement(this.props.children, {
            cards: this.props.cards
        });

        let cards = this.props.cards;

        return (
            <div className="app">
                <Link to="/new" className="float-button">+</Link>
                <List id="todo" title="To Do"
                    cards={_.filter(cards, (card) => card.status === "todo") } />
                <List id="in-progress" title="In Progress"
                    cards={_.filter(cards, (card) => card.status === "in-progress") } />

                <List id="done" title="Done"
                    cards={_.filter(cards, (card) => card.status === "done") } />
                {cardModal}
            </div>
        );
    }
}

export default (DragDropContext(HTML5Backend)(KanbanBoard) as any);