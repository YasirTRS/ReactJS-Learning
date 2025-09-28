import React from "react";
import { TodoProvider } from "./context/TodoContext";
import AddTodoContext from "./components/AddTodoContext";
import TodosContext from "./components/TodosContext";

export default function AppContext() {
  return (
    <TodoProvider>
        <AddTodoContext />
        <TodosContext />
    </TodoProvider>
  );
}
