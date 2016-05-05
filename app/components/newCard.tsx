import * as React from "react";
import update = require("react-addons-update");
import {History} from "react-router";

import * as Model from "../model/model";
import {CardForm} from "./cardForm";
import CardActionCreators from "../actions/cardActionCreators";

import DraftStore from "../stores/draftStore";
import {Container} from "flux/utils";

interface Props {
    history: History;
}
interface State {
    draft: Model.Card;
}

class NewCard extends React.Component<Props, State> {
    handleChange(field: string, value: any) {
        CardActionCreators.updateDraft(field, value);
    }
    handleSubmit(e) {
        e.preventDefault();
        CardActionCreators.addCard(this.state.draft);
        this.props.history.pushState(null, "/");
    }
    handleClose(e) {
        this.props.history.pushState(null, "/");
    }
    componentDidMount() {
        setTimeout(() => CardActionCreators.createDraft(), 0);
    }
    render() {
        return (
            <CardForm
                draftCard={this.state.draft}
                buttonLabel="Create Card"
                handleChange={this.handleChange.bind(this)}
                handleClose={this.handleClose.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
            />
        );
    }

    static getStores = () => ([DraftStore]);
    static calculateState = prevState => ({
        draft: DraftStore.getState()
    });
}

export default Container.create(NewCard);