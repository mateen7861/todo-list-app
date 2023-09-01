import React, { useState } from 'react';
import { useTodo } from '../../store';
import { TextField, Button, Grid } from '@mui/material';
const AddTodo: React.FC = () => {
  const { dispatch } = useTodo();
  const [newTask, setNewTask] = useState<string>('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: newTask });
      setNewTask('');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTask();
  };

  const inputStyles = {
    backgroundColor: 'white',
    borderRadius: '8px',
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#512DA8',
      },
    },
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            
            variant="outlined"
            placeholder="Add a new task..."
            value={newTask}
            size="small"
            onChange={(e) => setNewTask(e.target.value)}
            style={inputStyles} 
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
            fullWidth
            disableElevation
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddTodo;

