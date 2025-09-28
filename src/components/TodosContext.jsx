import React from "react";
import { useTodos } from "../context/TodoContext";

export default function TodosContext() {
  const { todos, removeTodo, toggleCompleted } = useTodos();

  return (
    <>
      <div className="text-2xl font-bold text-gray-300 mb-4 mt-6">My Todos (Context API)</div>
      {!todos.length ? (
        <div className="text-red-500 text-left border p-2 border-red-900 rounded">No Todos Found</div>
      ) : (
        <div>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="bg-gray-700 p-2 my-2 flex justify-between items-center rounded"
            >
                <div>
                <input
                    type="checkbox"
                    checked={todo.is_completed}
                    onChange={() => toggleCompleted(todo.id)}
                    className="mr-2 accent-green-500"
                />
                <span className={todo.is_completed ? "line-through text-gray-400" : ""}>
                    {todo.text}
                </span>
                </div>
              <button
                className="btn bg-red-600 text-white rounded text-xs py-1 px-2 cursor-pointer ml-4"
                onClick={() => removeTodo(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </div>
      )}
    </>
  );
}
