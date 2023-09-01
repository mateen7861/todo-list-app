import React from 'react';
import TaskItem from '../taskItem';
import { useTodo } from '../../store';
import { List } from '@mui/material';

const TaskList: React.FC = () => {
    const { state } = useTodo();

    return (
        <List>
            {
                state.tasks.length > 0 ? state.tasks?.map((task) => (
                    <TaskItem key={task.id} task={task} />
                )) : <p>No Tasks to display</p>
            }
        </List>
    );
};

export default TaskList;

