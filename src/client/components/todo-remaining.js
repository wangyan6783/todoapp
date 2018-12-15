import React from 'react';
import Button from './button';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  activeTasks: React.PropTypes.string,
  completeAllTasks: React.PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  activeTasks: '',
  completeAllTasks: noop,
};

/**
 * TodoRemaining component
 * @returns {ReactElement}
 */
const TodoRemaining = ({ activeTasks, completeAllTasks }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'task-remaining'

  return (
    <div className={baseCls}>
      <p>{activeTasks}</p>
      <Button onClick={completeAllTasks} text="Complete All" />
    </div>
  );
}

TodoRemaining.propTypes = propTypes;
TodoRemaining.defaultProps = defaultProps;

export default TodoRemaining;
