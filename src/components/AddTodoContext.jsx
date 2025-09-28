import React, { useState } from "react";
import Swal from "sweetalert2";
import { useTodos } from "../context/TodoContext";

export default function AddTodoContext() {
  const [todoInput, setTodoInput] = useState("");
  const { addTodo } = useTodos();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!todoInput.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Input Required',
        text: 'Something should be available in input',
      });
      return;
    }
    addTodo(todoInput);
    setTodoInput("");
  };

  return (
    <>
      <div className="text-4xl font-bold text-gray-300 my-7">Todo List App (Context API)</div>
      <form className="my-4 flex justify-center" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Add Todo"
          className="p-2 rounded-l bg-gray-700 text-white border border-gray-600 focus:outline-none"
          value={todoInput}
          onChange={(e) => setTodoInput(e.target.value)}
        />
        <button className="bg-blue-600 text-white rounded-r px-4 py-2 border border-blue-700 hover:bg-blue-700">
          Add
        </button>
      </form>
    </>
  );
}
