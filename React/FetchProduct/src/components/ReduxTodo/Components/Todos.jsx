import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, editTodo, toggleEdit } from './todoSlice';

export default function Todos() {
    const todos = useSelector((state)=> state.todos.todo)
    const dispatch = useDispatch()

    const [value, setValue]=useState("");
    const [editValue, setEditValue] = useState("");

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    const handleEdit = (id) => {
        dispatch(toggleEdit(id));
        const todo = todos.find(todo => todo.id === id);
        if (todo) {
            setEditValue(todo.text);
        }
    };

    const handleSaveEdit = (id) => {
        if (editValue.trim()) {
            dispatch(editTodo({ id, text: editValue }));
            setEditValue("");
        }
    };

    const handleCancelEdit = (id) => {
        dispatch(toggleEdit(id));
        setEditValue("");
    };
    
  return (
    <div>
        <div>
            <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} />
            <button onClick={()=> {
                if(value.trim()) {
                    dispatch(addTodo(value));
                    setValue("");
                }
            }}>Add todo</button>
        </div>
        <div>
            {todos && todos.map((todo)=>(
                <div key={todo.id} style={{margin: '10px 0', padding: '10px', border: '1px solid #ccc', borderRadius: '5px'}}>
                    {todo.isEditing ? (
                        <div>
                            <input 
                                type="text" 
                                value={editValue} 
                                onChange={(e) => setEditValue(e.target.value)}
                                style={{marginRight: '10px'}}
                            />
                            <button onClick={() => handleSaveEdit(todo.id)} style={{marginRight: '5px'}}>Save</button>
                            <button onClick={() => handleCancelEdit(todo.id)}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <span>{todo.text}</span>
                            <span 
                                onClick={() => handleEdit(todo.id)} 
                                style={{marginLeft: '10px', cursor: 'pointer'}}
                            >
                                🖋️
                            </span>
                            <span 
                                onClick={() => handleDelete(todo.id)} 
                                style={{marginLeft: '5px', cursor: 'pointer'}}
                            >
                                ❌
                            </span>
                        </div>
                    )}
                </div>
            ))}

        </div>
      
    </div>
  )
}
