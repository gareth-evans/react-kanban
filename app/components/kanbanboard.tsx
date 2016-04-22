import * as React from "react";
import {Card} from "./model/model";
import List from "./list";
import {Search} from "./search";
import {TaskCallbacks} from "./taskCallbacks";
import {CardCallbacks} from "./cardCallbacks";
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import {Link} from "react-router";

interface Props {
   cards: Card[];
   taskCallbacks: TaskCallbacks;
   cardCallbacks: CardCallbacks;
   children: any;
}

class KanbanBoard extends React.Component<Props, any> {
    render() {
        let cardModal = this.props.children && React.cloneElement(this.props.children, {
            cards: this.props.cards,
            cardCallbacks: this.props.cardCallbacks
        });
        return (
            <div className="app">
                <Link to="/new" className="float-button">+</Link>
                <List id="todo" title="To Do"
                    cards={this.props.cards.filter((card) => card.status === "todo")}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}/>

                <List id="in-progress" title="In Progress"
                    cards={this.props.cards.filter((card) => card.status === "in-progress")}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}/>

                <List id="done" title="Done"
                    cards={this.props.cards.filter((card) => card.status === "done")}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks} />
                {cardModal}
            </div>
        );
    }
}

export default (DragDropContext(HTML5Backend)(KanbanBoard) as any);