import * as React from "react";
import * as Model from "./model/model";
import {TaskCallbacks} from "./taskCallbacks";

interface Props {
    cardId: number;
    tasks: Model.Task[];
    callbacks: TaskCallbacks;
}

export class CheckList extends React.Component<Props, any> {
    checkInputKeyPress(evt: any) {
        if (evt.key === "Enter") {
            this.props.callbacks.add(this.props.cardId, evt.target.value);
            evt.target.value = "";
        }
    }

    render() {
        let tasks = this.props.tasks.map((task, taskIndex) => {
           return (
                <li className="checklist_task" key={task.id}>
                    <input type="checkbox"
                        checked={task.done}
                        onChange={this.props.callbacks.toggle.bind(null, this.props.cardId, task.id, taskIndex)} />
                    {task.name}
                    <a href="#"
                        className="checklist_task--remove"
                        onClick={this.props.callbacks.delete.bind(null, this.props.cardId, task.id, taskIndex)} />
                </li>
           );
        });

        return (
            <div className="checklist">
                <ul>{tasks}</ul>
                <input type="text"
                    className="checklist--add-task"
                    placeholder="Type then hit Enter to add a task"
                    onKeyPress={this.checkInputKeyPress.bind(this)} />
            </div>
        );
    }
}