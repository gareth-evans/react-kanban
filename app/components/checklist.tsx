import * as React from "react";
import * as Model from "../model/model";
import {TaskCallbacks} from "../taskCallbacks";
import TaskActionCreators from "../actions/taskActionCreators";

interface Props {
    cardId: number;
    tasks: Model.Task[];
}

export class CheckList extends React.Component<Props, any> {
    checkInputKeyPress(evt: any) {
        if (evt.key === "Enter") {
            TaskActionCreators.addTask(this.props.cardId, evt.target.value);
            evt.target.value = "";
        }
    }

    render() {
        let tasks = this.props.tasks.map((task, taskIndex) => {
           return (
                <li className="checklist_task" key={task.id}>
                    <input type="checkbox"
                        checked={task.done}
                        onChange={TaskActionCreators.toggleTask.bind(null, this.props.cardId, task.id, taskIndex)} />
                    {task.name}
                    <a href="#"
                        className="checklist_task--remove"
                        onClick={TaskActionCreators.deleteTask.bind(null, this.props.cardId, task.id, taskIndex)} />
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