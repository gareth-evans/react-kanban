import * as React from "react";
import * as Model from "./model/model";


interface Props {
    draftCard: Model.Card;
    handleChange: (field, e) => void;
    handleClose: (e) => void;
    handleSubmit: any;
    buttonLabel: string;
}

export class CardForm extends React.Component<Props, any> {
    handleChange(field, e) {
        this.props.handleChange(field, e.target.value);
    }
    handleClose(e) {
        e.preventDefault();
        this.props.handleClose(e);
    }
    render() {
        return (
            <div>
                <div className="card big">
                    <form onSubmit={this.props.handleSubmit.bind(this) }>
                        <input type="text"
                            value={this.props.draftCard.title}
                            onChange={this.handleChange.bind(this, "title") }
                            placeholder="Title"
                            required={true}
                            autoFocus={true} />
                        <textarea value={this.props.draftCard.description}
                            onChange={this.handleChange.bind(this, "description") }
                            placeholder="Description"
                            required={true} />
                        <label htmlFor="status">Status</label>
                        <select id="status"
                            value={this.props.draftCard.status}
                            onChange={this.handleChange.bind(this, "status") }>
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        <br />
                        <label htmlFor="color">Color</label>
                        <input id="color"
                            value={this.props.draftCard.color}
                            onChange={this.handleChange.bind(this, "color")}
                            type="color"
                            defaultValue="#ff0000" />
                        <div className="actions">
                            <button type="submit">{this.props.buttonLabel}</button>
                        </div>
                    </form>
                </div>
                <div className="overlay" onClick={this.handleClose.bind(this)}>
                </div>
            </div>
        );
    }
}