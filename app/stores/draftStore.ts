import AppDispatcher from "../appDispatcher";
import {Constants} from "../constants";
import {ReduceStore} from "flux/utils";
import * as Model from "../model/model";
import update = require("react-addons-update");

let defaultDraft: () => Model.Card = () => {
    return {
        id: Date.now(),
        title: "",
        description: "",
        status: "todo",
        color: "#c9c9c9",
        tasks: []
    };
};

class DraftStore extends ReduceStore<any> {
    getInitialState() {
        return {};
    }
    reduce(state: Model.Card, action: any) {
        switch (action.type) {
            case Constants.CREATE_DRAFT:
                if (action.payload.card) {
                    return update(this.getState(), {
                        $set: action.payload.card
                    });
                }
                else {
                    return defaultDraft();
                }
            case Constants.UPDATE_DRAFT:
                return update(this.getState(), {
                    [action.payload.field]: {
                        $set: action.payload.value
                    }
                });
            default:
            return state as any;
        }
    }
}

export default new DraftStore(AppDispatcher)