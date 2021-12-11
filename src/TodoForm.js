import React from 'react'

export default class TodoForm extends React.Component {

  state = { value: '' }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  addItem = () => {
    const { value } = this.state
    if (value && value !== '') {
      this.props.addItem({ newItemValue: value });
      this.setState({ value: '' })
    }
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <input type="text" value={this.state.value} data-cy="newItemField"
          className="form-control" placeholder="add a new item..." onChange={this.handleChange} />
        <button className="pure-button pure-button-primary" id="addBtn" onClick={this.addItem}>Add</button>
      </div>
    );
  }
}