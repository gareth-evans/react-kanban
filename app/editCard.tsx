import * as React from "react";
import "lodash";
import update = require("react-addons-update");
import {History} from "react-router";

import * as Model from "./model/model";
import {CardForm} from "./cardForm";
import {CardCallbacks} from "./cardCallbacks";

interface Props {
    cards: Model.Card[];
    cardCallbacks: CardCallbacks;
    history?: History;
    params?: any;
}

export class EditCard extends React.Component<Props, Model.Card> {
    componentWillMount() {
        let cardId = Number(this.props.params.card_id);
        if (cardId === NaN) { throw new Error("card_id is not a number"); }
        let card = _.find(this.props.cards, (card) => card.id === cardId);
        this.setState(card);
    }
    handleChange(field: string, value: any) {
        let newState = update(this.state, { [field] : { $set: value }});
        this.setState(newState);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.cardCallbacks.updateCard(this.state);
        this.props.history.pushState(null, "/");
    }
    handleClose(e) {
        this.props.history.pushState(null, "/");
    }
    render() {
        return (
            <CardForm
                buttonLabel="Edit Card"
                draftCard={this.state}
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                handleClose={this.handleClose.bind(this)} />
        );
    }
}