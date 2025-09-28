import React, { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export function useTodos() {
  return useContext(TodoContext);
}

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos([
      ...todos,
      {
        id: Date.now().toString(),
        text,
        is_completed: false,
      },
    ]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo
      )
    );
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggleCompleted }}>
      {children}
    </TodoContext.Provider>
  );
}
