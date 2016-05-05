import * as React from "react";
import * as _ from "lodash";
import update = require("react-addons-update");
import {Container} from "flux/utils";

import {throttle} from "../utils";
import CardActionCreators from "../actions/cardActionCreators";
import CardStore from "../stores/cardStore";

import KanbanBoard from "./kanbanboard";
import * as Model from "../model/model";
import {Task} from "../model/model";

const api_url = "http://kanbanapi.pro-react.com";

let headers = new Headers();
headers.append("Content-Type", "application/json");
headers.append("Authorization", "graz36m");

interface Props {
    cards: Model.Card[];
    children: any;
}

interface State {
    cards: Model.Card[];
}

class KanbanBoardContainer extends React.Component<Props, State> {
    componentDidMount() {
        CardActionCreators.fetchCards();
    }

    render() {
        let style = { height: "100%" };
        let kanbanBoard = this.props.children && React.cloneElement(this.props.children, {
            cards: this.state.cards
        });

        return <div style={style}>{kanbanBoard}</div>;
    }
    static getStores = () => ([CardStore]);
    static calculateState = (prevState) => ({
        cards: CardStore.getState()
    });
}

export default Container.create(KanbanBoardContainer);