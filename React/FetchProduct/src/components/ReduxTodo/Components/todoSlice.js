import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    todo: []
}

export const todoSlice = createSlice ({
    name: 'todo',
    initialState,
    reducers:{
        addTodo: (state, action) => {
           const newTodo = {
               id: Date.now(),
               text: action.payload,
               isEditing: false
           };
           state.todo = [...state.todo, newTodo];
        },
        deleteTodo: (state, action) => {
            state.todo = state.todo.filter(todo => todo.id !== action.payload);
        },
        editTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todo.find(todo => todo.id === id);
            if (todo) {
                todo.text = text;
                todo.isEditing = false;
            }
        },
        toggleEdit: (state, action) => {
            const todo = state.todo.find(todo => todo.id === action.payload);
            if (todo) {
                todo.isEditing = !todo.isEditing;
            }
        }
    }
})

export const {addTodo, deleteTodo, editTodo, toggleEdit} = todoSlice.actions

export default todoSlice.reducer