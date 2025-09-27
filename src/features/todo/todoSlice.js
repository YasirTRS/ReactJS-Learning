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
        }
});

export const {addTodo, removeTodo, toggleCompleted} = todoSlice.actions;
export default todoSlice.reducer;