
import './App.css'
import AddTodo from './components/addTodo'
import TaskList from './components/todoList'

function App() {

  return (
    <div className='app'>
    <h1>Todo List App</h1>
    <AddTodo/>
    <TaskList/>
    </div>
  )
}

export default App
