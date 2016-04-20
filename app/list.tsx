import * as React from "react";
import * as Model from "./model/model";
import Card from "./card";
import {TaskCallbacks} from "./taskCallbacks";
import {CardCallbacks} from "./cardCallbacks";
import {DropTarget, DropTargetSpec, DropTargetMonitor, DropTargetCollector} from "react-dnd";
import {Constants} from "./constants";

interface Props {
    id: string;
    title: string;
    cards: Model.Card[];
    taskCallbacks: TaskCallbacks;
    cardCallbacks: CardCallbacks;
    connectDropTarget?: any;
    isOver?: () => boolean;
}

const listTargetSpec: DropTargetSpec<Props> = {
    hover(props: Props, monitor: DropTargetMonitor) {
        const draggedId = (monitor.getItem() as any).id;
        props.cardCallbacks.updateCardStatus(draggedId, props.id);
    }
};

let collect: DropTargetCollector = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
};

class List extends React.Component<Props, any> {
    render() {
        const { connectDropTarget, isOver } = this.props;

        let cards = this.props.cards.map((card) => {
            return (
                <div key={card.id}>
                <Card
                    id={card.id}
                    key={card.id}
                    title={card.title}
                    description={card.description}
                    color={card.color}
                    tasks={card.tasks}
                    taskCallbacks={this.props.taskCallbacks}
                    cardCallbacks={this.props.cardCallbacks}
                    status={card.status}
                />
                </div>); });
        return connectDropTarget(
            <div className="list">
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}

export default DropTarget(Constants.CARD, listTargetSpec, collect)(List);