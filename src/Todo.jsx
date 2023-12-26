import React, { useState } from 'react'
import { ACTIONS } from './Reducer'
import { BUTTON_STYLE } from './Reducer'
import { CheckCircle, Circle, Edit2, MessageCircle, Trash2 } from 'lucide-react'

export default function Todo({todo, name, dispatch}) {
  const [editComment, setEditComment] = useState(false)  
  const [editName, setEditName] = useState(false)  
  return (
    <div className='flex justify-between items-center max-w-[680px] w-full border border-gray-600'>
      <div>
        {editName ?
          <form onSubmit={()=>setEditName(!editName)}>
            <input 
            type="text"
            className='text-center w-full max-w-[200px] whitespace-nowrap overflow-hidden overflow-ellipsis' 
            value={todo.name}
            onChange={(e)=>{              
              dispatch({type:ACTIONS.EDIT_TODO, payload: {id:todo.id, name:e.target.value}})
            }}
            />
          </form>
          :
          <span className={`${todo.complete ? "text-amber-400" : "text-white"} text-xl m-2 p-2 w-full max-w-[200px]`}>{todo.name}</span>
        }
      </div>
        {editComment ?
          <form onSubmit={()=>setEditComment(!editComment)}>
            <input 
              type="text"
              className='text-center w-full max-w-[200px] whitespace-nowrap overflow-hidden overflow-ellipsis' 
              value={todo.comment}
              onChange={(e)=>{              
                dispatch({type:ACTIONS.ADD_COMMENT, payload: {id:todo.id, comment:e.target.value}})
              }}
            />
          </form> 
          :
          todo.comment && <span className="text-gray-400 text-lg m-2 p-2 w-full max-w-[200px] whitespace-nowrap overflow-hidden overflow-ellipsis">&#8220;{todo.comment}&#8221;</span>}
      <div>
        <button 
          onClick={()=>dispatch({type:ACTIONS.TOGGLE_TODO, payload: {id:todo.id}})} 
          className={BUTTON_STYLE}>{!todo.complete && <Circle/>}{todo.complete && <CheckCircle/>}
        </button>
        <button
          onClick={()=>setEditComment(!editComment)}
          className={BUTTON_STYLE}><MessageCircle/>
        </button>
        <button
          onClick={()=>setEditName(!editName)}
          className={BUTTON_STYLE}><Edit2/>
        </button>
        <button
          onClick={()=>dispatch({type:ACTIONS.DELETE_TODO, payload: {id:todo.id}})} 
          className={BUTTON_STYLE}><Trash2/>
        </button>
      </div>
    </div>
  )
}

