import { useReducer, useState } from "react"
import Todo from "./Todo"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"

export const ACTIONS = {
  ADD_TODO : 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO : 'delete-todo',
  ADD_COMMENT : 'add-comment',
  EDIT_TODO : 'edit-todo'
}

export const BUTTON_STYLE = 'text-white text-xl px-1 h-12 active:text-amber-300 active:border-amber-300 hover:text-amber-400 hover:border-amber-400'

function reducer(todos,action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO :
      return [...todos,newTodo(action.payload.name)]
    case ACTIONS.TOGGLE_TODO:
      return todos.map(todo=>{
        if(todo.id === action.payload.id) {
          return {...todo, complete: !todo.complete}
        }
        return todo
      })
    case ACTIONS.DELETE_TODO :
      return todos.filter(todo=>todo.id!==action.payload.id)
    case ACTIONS.ADD_COMMENT :
      return todos.map(todo=>{
        if(todo.id === action.payload.id){
          return {...todo,comment:action.payload.comment}
        }
        return todo
      })
    case ACTIONS.EDIT_TODO : 
      return todos.map(todo=>{
        if(todo.id === action.payload.id){
          return {...todo,name:action.payload.name}
        }
        return todo
      })
    default :
      return todos
  }
}

function newTodo(name) {
  return { id:Date.now(), name:name, complete: false}
}

function Reducer() {
  const [todos,dispatch] = useReducer(reducer,[])
  const [name,setName] = useState('')

  function handleSubmit(e){
    e.preventDefault()
    dispatch({type:ACTIONS.ADD_TODO, payload: {name:name}})
    setName('')
  }

  return (
    <>
    <div className='flex flex-col mt-16 justify-center items-center text-gray-300 font-bold text-xl'>
      Switch to
      <Link 
        className='text-gray-300 font-bold text-lg hover:text-amber-400'
        to='/noreducer'
      >
        No Reducer
      </Link>
      <Link 
        className='text-gray-300 font-bold text-lg hover:text-amber-400'
        to='/reducersaved'
      >
        Reducer Saved
      </Link>
      <h1 className="mt-10 text-amber-400">- Reducer Version -</h1>
    </div>
    <form onSubmit={handleSubmit} className="flex justify-center items-center mt-4 mb-4">
      <input 
        type="text"
        value={name} 
        onChange={e=>setName(e.target.value)}
        className="w-80 h-12 px-4 -m-2 outline-none"
      />
      <button 
        className='text-white text-xl px-4 m-2 h-12 border border-gray-300 active:text-amber-300 active:border-amber-300 hover:text-amber-400 hover:border-amber-400'
        onClick={handleSubmit}>
        <Plus />
      </button>
    </form>
    <div className="flex flex-col justify-center items-center gap-4">
      {todos.map(todo=>{
        return <Todo key={todo.id} name={name} todo={todo} dispatch={dispatch}/>
      })}
    </div>
    <div className="flex flex-col justify-center items-center mt-8 p-4 bg-gray-800 text-white rounded">
        <h2 className="text-2xl font-bold mb-4">Benefits of <span className="text-amber-400">useReducer</span></h2>
        <ul className="list-disc pl-6">
          <li className="mb-2">
            <span className="font-bold">Predictable State Changes:</span> Reducer provides a centralized logic for
            state transitions, ensuring predictability.
          </li>
          <li className="mb-2">
          <span className="font-bold">Centralized Logic:</span> Reducer logic is separated, promoting cleaner
            code structure and easier maintenance.
          </li>
          <li className="mb-2">
          <span className="font-bold">Separation of Concerns:</span> Reducer logic is separate from component
            logic, enhancing modularity.
          </li>
          <li className="mb-2">
          <span className="font-bold">DevTools Integration:</span> Works seamlessly with browser dev tools for
            better debugging.
          </li>
        </ul>
        <div className="flex flex-col justify-center items-center mt-8 p-4 bg-gray-800 text-white rounded">
          <p>Consider using <span className="text-amber-400">useReducer</span> when your state logic becomes more complex, and you need a structured approach to handle it.</p>
          <p>For simpler cases, <span className="text-amber-400">useState</span> might be more concise and easier to understand.</p>
        </div>
      </div>
    </>
  )
}

export default Reducer
