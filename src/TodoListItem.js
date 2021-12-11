import React from "react";

export default class TodoListItem extends React.Component {
  onClickClose = () => {
    const { index, removeItem } = this.props;
    removeItem(index);
  };
  onClickDone = () => {
    const { index, markTodoDone } = this.props;
    markTodoDone(index);
  };

  render() {
    const { item } = this.props;
    const todoClass = item.done ? "done" : "undone";
    return (
      <tr data-cy='todoItem'>
        <td className={todoClass}>
          <span
            data-cy="markAsCompleted"
            className="glyphicon glyphicon-ok icon"
            aria-hidden="true"
            onClick={this.onClickDone}
          />
          {item.value}
          <span
            data-cy="markAsDeleted"
            className="glyphicon glyphicon-remove-sign close"
            aria-hidden="true"
            onClick={this.onClickClose}
          />
        </td>
      </tr>
    );
  }
}
