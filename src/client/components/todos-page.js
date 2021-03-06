import React from 'react';
import { Link } from 'react-router';

import { api, getApiPromise } from '../helpers/api';
import Navbar from './navbar';
import TodoRemaining from './todo-remaining';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page'

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: React.PropTypes.object,
  };

  static defaultProps = {
    params: {},
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      filterBy: props.params.filter,
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.completeAllTasks = this.completeAllTasks.bind(this);
    this.archiveTask = this.archiveTask.bind(this);
    this.archiveAllCompleted = this.archiveAllCompleted.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
  }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      alert("Content can not be blank");
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    this.setState({
      todos: [...this.state.todos, json]
    });
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy(filterBy) {
    this.setState({ filterBy });
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    this.setState({ todos });
  }

  activeTasks() {
    let numOfTasks = this.state.todos.filter(function(todo){
      return todo.status === "active";
    }).length;
    return numOfTasks < 2 ? `${numOfTasks} task remaining` : `${numOfTasks} tasks remaining`
  }

  completeAllTasks() {
    api('COMPLETEALL', null, this.updateTodos);
  }

  archiveTask(id) {
    api('ARCHIVETASK', id, this.updateTodos);
  }

  archiveAllCompleted() {
  api('ARCHIVEALL', null, this.updateTodos);
}

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    return (
      <div className={this.baseCls}>
        <Navbar filterBy={this.state.filterBy} onClickFilter={this.setFilterBy} archiveAllCompleted={this.archiveAllCompleted} />
        <TodoRemaining activeTasks={this.activeTasks()} completeAllTasks={this.completeAllTasks}/>
        <TodoForm addTodo={this.addTodo} />
        <Todos
          filterBy={this.state.filterBy}
          todos={this.state.todos}
          updateTodos={this.updateTodos}
          archiveTask={this.archiveTask}
        />
      </div>
    );
  }
}

export default TodosPage;
