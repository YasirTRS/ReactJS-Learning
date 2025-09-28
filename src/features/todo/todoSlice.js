import { createSlice, nanoid } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                text: action.payload,
                is_completed: false,
            };
            state.todos.push(todo);
        },
        removeTodo: (state, action) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload);
            if(index !== -1) {
                state.todos.splice(index, 1);
            }
        },
        toggleCompleted: (state, action) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.is_completed = !todo.is_completed;
            }
        }
        ,
        updateTodo: (state, action) => {
            const { id, text, is_completed } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = text;
                todo.is_completed = is_completed;
            }
        }
        }
});

export const {addTodo, removeTodo, toggleCompleted, updateTodo} = todoSlice.actions;
export default todoSlice.reducer;