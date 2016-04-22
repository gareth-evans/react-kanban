import * as React from "react";
import update = require("react-addons-update");
import {History} from "react-router";

import * as Model from "./model/model";
import {CardForm} from "./cardForm";
import {CardCallbacks} from "./cardCallbacks";

interface Props {
    cardCallbacks: CardCallbacks;
    history: History;
}

export class NewCard extends React.Component<Props, Model.Card> {
    constructor() {
        super(arguments as any);
        this.state = {
            id: Date.now(),
            title: "",
            description: "",
            status: "todo",
            color: "#c9c9c9",
            tasks: []
        };
    }
    handleChange(field: string, value: any) {
        let newState = update(this.state, { [field] : { $set: value} });
        this.setState(newState);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.cardCallbacks.addCard(this.state);
        this.props.history.pushState(null, "/");
    }
    handleClose(e) {
        this.props.history.pushState(null, "/");
    }
    render() {
        return (
            <CardForm
                draftCard={this.state}
                buttonLabel="Create Card"
                handleChange={this.handleChange.bind(this)}
                handleClose={this.handleClose.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
            />
        )
    }
}