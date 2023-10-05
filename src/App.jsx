import "./App.css"
import React, { Component } from "react"
import Count from "./Count"

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
    this.handleEditTodo = this.handleEditTodo.bind(this)
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
        toEdit: false,
      }),
      inputVal: "",
    }))
  }
  handleDeleteTodo(id) {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    }))
  }

  handleEditTodo(id) {
    this.setState((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, toEdit: true } : todo
      ),
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
        <Count count={this.state.todos.length} />

        <ul>
          {this.state.todos.map((todo) =>
            todo.toEdit ? (
              <form
                key={todo.id}
                onSubmit={(e) => {
                  e.preventDefault()
                  console.log(e)
                  this.setState((state) => ({
                    todos: state.todos.map((t) =>
                      t.id === todo.id
                        ? {
                            ...t,
                            todo: e.target.querySelector("input").value,
                            toEdit: false,
                          }
                        : t
                    ),
                  }))
                }}
              >
                <input type="text" placeholder={todo.todo} />
                <button type="submit">Save</button>
              </form>
            ) : (
              <li key={todo.id}>
                {todo.todo}{" "}
                <button
                  className="edit-btn"
                  onClick={() => this.handleEditTodo(todo.id)}
                >
                  edit
                </button>{" "}
                <button
                  className="remove-btn"
                  onClick={() => this.handleDeleteTodo(todo.id)}
                >
                  delete
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    )
  }
}
