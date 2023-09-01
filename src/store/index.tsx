import React, { createContext, useReducer, useContext, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';

export interface Task {
    id: string;
    text: string;
    completed: boolean;
};


interface TodoState {
  tasks: Task[];
};

type TodoAction =
  | { type: 'LOAD_DATA'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'REMOVE_TASK'; payload: string };

const initialState: TodoState = {
  tasks:JSON.parse(localStorage.getItem('tasks') as string)||[],
};

const TodoContext = createContext<{
  state: TodoState;
  dispatch: React.Dispatch<TodoAction>;
} | undefined>(undefined);

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case "LOAD_DATA":
        return {
            ...state,
            tasks: action.payload
          };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: uuidv4(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    console.log("its called 231312",state)

        localStorage.setItem('tasks', JSON.stringify(state.tasks));
   
  }, [state.tasks]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within TodoProvider');
  }
  return context;
};
