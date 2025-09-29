import {configureStore} from '@reduxjs/toolkit';
import todoReducer from '../features/todo/todoSlice';

export const store = configureStore({
    reducer: todoReducer,
});

// Persist todos to localStorage on change
store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("todos-redux", JSON.stringify(state.todos));
});