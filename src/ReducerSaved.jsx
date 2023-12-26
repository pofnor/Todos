import { useReducer, useState, useEffect } from "react"
import Todo from "./Todo"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import { BUTTON_STYLE } from "./Reducer"

export const ACTIONS = {
  ADD_TODO : 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO : 'delete-todo',
  ADD_COMMENT : 'add-comment',
  EDIT_TODO : 'edit-todo'
}

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
  return { id:Date.now(), name:name, comment: '', complete: false}
}

function ReducerSaved() {
  const [todos, dispatch] = useReducer(reducer, [], (initial) => {
    const storedTodos = localStorage.getItem("todos")
    return storedTodos ? JSON.parse(storedTodos) : initial
  })
  const [name,setName] = useState('')

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  function handleSubmit(e){
    e.preventDefault()
    dispatch({type:ACTIONS.ADD_TODO, payload: {name:name}})
    setName('')
  }

  return (
    <>
    {/* <div className='flex flex-col mt-16 justify-center items-center text-gray-300 font-bold text-xl'>
      Switch to
      <Link 
        className='text-gray-300 font-bold text-lg hover:text-amber-400'
        to='/noreducer'
      >
        No Reducer
      </Link>
      <Link 
        className='text-gray-300 font-bold text-lg hover:text-amber-400'
        to='/'
      >
        Reducer
      </Link>
      <h1 className="mt-10 text-amber-400">- Reducer Saved Version -</h1>
    </div> */}
    <form onSubmit={handleSubmit} className="flex justify-center items-center mt-4 mb-4">
      <input 
        type="text"
        value={name} 
        onChange={e=>setName(e.target.value)}
        className="max-w-[680px] w-full h-12 px-4 -m-2 outline-none"
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
    </>
  )
}

export default ReducerSaved
