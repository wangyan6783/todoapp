import React from 'react';

import Button from './button';
import TodoLink from './todo-link';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: React.PropTypes.bool,
  onClickDelete: React.PropTypes.func,
  onClickTodo: React.PropTypes.func,
  status: React.PropTypes.string,
  text: React.PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickTodo: noop,
  status: '',
  text: '',
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ filtered, onClickDelete, onClickTodo, status, text, id, archive, archiveTask }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo';

  const todoCls = baseCls
    + (status === 'complete' ? ' todo--status-complete' : '')
    + (filtered ? ' todo--filtered' : '');

  const checkedStatus = status === 'complete' ? true : false;

  const renderArchiveBtn = () => {
    if (status === 'complete' && !archive) {
      return <Button className="archive-btn" text="Archive" onClick={e => archiveTask(id)} />
    }
  }

  return (
    <li className={todoCls}>
      <input type="checkbox" onChange={onClickTodo} checked={checkedStatus}/>
      <TodoLink text={text} onClick={onClickTodo} />
        {renderArchiveBtn()}
        <Button className="delete-btn" text="Delete" onClick={onClickDelete} />
    </li>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
