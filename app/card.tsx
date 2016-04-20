import * as CSSTransitionGroup from "react-addons-css-transition-group";

import * as React from "react";
import * as marked from "marked";
import {DragSource, DragSourceSpec, DragSourceCollector, ConnectDragSource, DropTargetSpec, DropTargetCollector, ConnectDropTarget, DropTarget} from "react-dnd";

import * as Model from "./model/model";
import {TaskCallbacks} from "./taskCallbacks";
import {CardCallbacks} from "./cardCallbacks";
import {CheckList} from "./checkList";
import {Constants} from "./constants";
import {Link} from "react-router";

interface Props {
    id: number;
    title: string;
    description: string;
    color: string;
    tasks: Model.Task[];
    taskCallbacks: TaskCallbacks;
    cardCallbacks: CardCallbacks;
    status: string;
    connectDragSource?: ConnectDragSource;
    isDragging?: () => boolean;
    connectDropTarget?: ConnectDropTarget;
}

interface State {
    showDetails: boolean;
}

let cardDragSpec: DragSourceSpec<Props> = {
    beginDrag(props: Props) {
        return {
            id: props.id
        };
    },
    endDrag(props: Props) {
        props.cardCallbacks.persistCardDrag(props.id, props.status);
    }
};

let cardDropSpec: DropTargetSpec<Props> = {
    hover(props, monitor) {
        const draggedId = (monitor.getItem() as any).id;
        props.cardCallbacks.updateCardPosition(draggedId, props.id);
    }
};

let collectDrag: DragSourceCollector = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

let collectDrop: DropTargetCollector = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget()
    };
};

class Card extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            showDetails: false
        };
    }

    toggleDetails() {
        this.setState({ showDetails: !this.state.showDetails });
    }

    render() {
        const {connectDragSource, isDragging, connectDropTarget} = this.props;
        let cardDetails;

        if (this.state.showDetails) {
            cardDetails = (
                <div className="card_details">
                    <span dangerouslySetInnerHTML={{ __html: marked(this.props.description) }} />
                    <CheckList
                        cardId={this.props.id}
                        tasks={this.props.tasks}
                        callbacks={this.props.taskCallbacks} />
                </div>);
        }

        let sideColor = {
            position: "absolute",
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 8,
            backgroundColor: this.props.color
        };

        let cardStyle = {
            opacity: isDragging ? 0.5 : 1
        };

        return connectDropTarget(connectDragSource(
            <div className="card" style={cardStyle}>
                <div style={sideColor} />
                <div className="card__edit">
                    <Link to={"/edit/" + this.props.id}>✎</Link>
                </div>
                <div
                    className={this.state.showDetails ? "card_title card_title--is-open" : "card_title" }
                    onClick={this.toggleDetails.bind(this) }>
                    {this.props.title}</div>
                <CSSTransitionGroup transitionName="toggle"
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={250}>
                    {cardDetails}
                </CSSTransitionGroup>
            </div>
        ));
    }
}

let dragSourceCard = DragSource(Constants.CARD, cardDragSpec, collectDrag)(Card);
let dropTargetCard = DropTarget(Constants.CARD, cardDropSpec, collectDrop)(dragSourceCard);

export default dropTargetCard;