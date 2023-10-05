import "./App.css"
import React, { Component } from "react"

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      inputVal: "",
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
  }

  handleInputChange(e) {
    this.setState({
      inputVal: e.target.value,
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.setState((state) => ({
      todos: state.todos.concat({
        id: state.todos.length,
        todo: state.inputVal,
      }),
      inputVal: "",
    }))
  }
  handleDeleteTodo(id) {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }))
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
            placeholder="Enter a todo"
          />
          <button type="submit">Submit</button>
        </form>

        <h3>All the tasks</h3>

        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo.id}>
              {todo.todo}{" "}
              <button onClick={() => this.handleDeleteTodo(todo.id)}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
