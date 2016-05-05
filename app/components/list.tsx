import * as React from "react";
import * as Model from "../model/model";
import Card from "./card";
import {DropTarget, DropTargetSpec, DropTargetMonitor, DropTargetCollector} from "react-dnd";
import {Constants} from "../constants";
import CardActionCreators from "../actions/cardActionCreators";

interface Props {
    id: string;
    title: string;
    cards: Model.Card[];
    connectDropTarget?: any;
    isOver?: () => boolean;
}

const listTargetSpec: DropTargetSpec<Props> = {
    hover(props: Props, monitor: DropTargetMonitor) {
        const dragged = (monitor.getItem() as any);
        CardActionCreators.updateCardStatus(dragged.id, props.id);
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
                    status={card.status}
                    showDetails={card.showDetails}
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