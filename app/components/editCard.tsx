import * as React from "react";
import "lodash";
import update = require("react-addons-update");
import {History} from "react-router";

import * as Model from "../model/model";
import {CardForm} from "./cardForm";
import CardStore from "../stores/cardStore";
import CardActionCreators from "../actions/cardActionCreators";

import DraftStore from "../stores/draftStore";
import {Container} from "flux/utils";

interface Props {
    cards: Model.Card[];
    history?: History;
    params?: any;
}

interface State {
    draft?: Model.Card;
}

export class EditCard extends React.Component<Props, State> {
    handleChange(field: string, value: any) {
        CardActionCreators.updateDraft(field, value);
    }
    handleSubmit(e) {
        e.preventDefault();
        CardActionCreators.updateCard(CardStore.getCard(parseInt(this.props.params.card_id)),
            this.state.draft);
        this.props.history.pushState(null, "/");
    }
    handleClose(e) {
        this.props.history.pushState(null, "/");
    }
    componentDidMount() {
        setTimeout(() => {
            CardActionCreators.createDraft(CardStore.getCard(parseInt(this.props.params.card_id)));
        }, 0);
    }
    render() {
        return (
            <CardForm
                buttonLabel="Edit Card"
                draftCard={this.state.draft}
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} />
        );
    }
    static getStores = () => ([DraftStore]);
    static calculateState = prevState => {
        return {
            draft: DraftStore.getState()
        };
    };
}

export default Container.create(EditCard);