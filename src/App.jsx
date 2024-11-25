
import { useState ,useEffect} from 'react'
import './App.css'
import { TodoProvider } from './Contexts/todoContext'
import TodoForm from './Components/TodoForm'
import TodoItem from './Components/TodoItem'
function App() {
const [todos,setTodos]= useState([])

  const addTodo =(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo}, ...prev])
  }

//  const updateTodo=(id,todo)=>{
//   setTodos((prev)=> prev.map((prevTodo)=>{
//     if(prevTodo.id===id){
//       return todo
//     }
//     else {
//       return prevTodo
//     }
//   })
//   )
//  }
const updateTodo=(id, todo)=>{
  setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id===id ? todo : prevTodo)))
}

// const deleteTodo = (id) => {
//   setTodos((prev) => {
//     // Check if the todo with the given ID exists
//     const todoExists = prev.some((todo) => todo.id === id);

//     if (todoExists) {
//       // If the todo exists, filter it out
//       return prev.filter((todo) => todo.id !== id);
//     } else {
//       // If the todo doesn't exist, return the same state or log an optional message
//       console.warn(`Todo with ID ${id} not found`);
//       return prev;
//     }
//   });
// };

const deleteTodo=(id) =>{
  setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
}

// const toggleComplete = (id) => {
//   setTodos((prev) => 
//     prev.map((prevTodo) => {
//       if (prevTodo.id === id) {
//         // Toggle the 'completed' status if the IDs match
//         return { 
//           ...prevTodo, 
//           completed: !prevTodo.completed 
//         };
//       } else {
//         // Return the todo unchanged if the IDs don't match
//         return prevTodo;
//       }
//     })
//   );
// };

const toggleComplete=(id)=> {
  setTodos((prev)=>
prev.map((prevTodo)=>
prevTodo.id===id ? {...prevTodo, completed:!prevTodo.completed}: prevTodo))
}


useEffect(() => {
  const todos = JSON.parse(localStorage.getItem("todos"))

  if (todos && todos.length > 0) {
    setTodos(todos)
  }
}, [])

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))
}, [todos])

  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
    <div className="bg-[#0761e8] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
    </div>
    </TodoProvider>
  )
}

export default App

