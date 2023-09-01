import React from 'react';
import { Task, useTodo } from '../../store';
import { ListItem, ListItemIcon, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './styles.module.css'; 

interface IProps {
  task: Task;
}

const TaskItem: React.FC<IProps> = ({ task }) => {
  const { dispatch } = useTodo();

  const handleToggle = () => {
    dispatch({ type: 'TOGGLE_TASK', payload: task.id });
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_TASK', payload: task.id });
  };

  return (
    <ListItem className={styles.taskItem}>
      <ListItemIcon>
        <Checkbox onChange={handleToggle} checked={task.completed} />
      </ListItemIcon>
      <ListItemText
        primary={task.text}
        className={task.completed ? styles.completedText: styles.normalText}
      />
      <IconButton onClick={handleRemove}>
        <DeleteIcon color='error' />
      </IconButton>
    </ListItem>
  );
};

export default TaskItem;
