import React from 'react';

const noop = () => {};

/**
 * TodoForm component
 * @class
 */
class TodoForm extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todo-form';

  /**
   * Prop Types
   * @static
   */
  static propTypes = {
    addTodo: React.PropTypes.func,
  };

  static defaultProps = {
    addTodo: noop,
  };

  /**
   * Constructor
   * @constructor
   */
  constructor(props) {
    super(props);

    this.state = { input: '' };

    this.onChange = this.onChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  /**
   * On change handler for input field
   * @param  {object} e - Event object
   */
  onChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  /**
   * On submit handler for submitting form
   * @param  {object} e - Event object
   */
  addTodo(e) {
    e.preventDefault();

    this.props.addTodo(this.state.input);

    this.setState({ input: '' });
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    return (
      <form onSubmit={this.addTodo}>
        <input
          className="add-todo-input"
          onChange={this.onChange}
          placeholder="Add new todo..."
          value={this.state.input}
        />
      </form>
    );
  }
}

export default TodoForm;
