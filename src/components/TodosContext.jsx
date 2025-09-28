import { useState } from "react";
import Swal from "sweetalert2";
import { useTodos } from "../context/TodoContext";

export default function TodosContext() {
  const { todos, removeTodo, toggleCompleted } = useTodos();
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(todos.length / pageSize);
  const paginatedTodos = todos.slice((page - 1) * pageSize, page * pageSize);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <>
      <div className="text-2xl font-bold text-gray-300 mb-4 mt-6">My Todos (Context API)</div>
      {!todos.length ? (
        <div className="text-red-500 text-left border p-2 border-red-900 rounded">No Todos Found</div>
      ) : (
        <div>
          {paginatedTodos.map((todo) => (
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
                onClick={async () => {
                  const result = await Swal.fire({
                    title: 'Are you sure?',
                    text: 'Do you really want to delete this todo?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, delete it!',
                    cancelButtonText: 'Cancel',
                  });
                  if (result.isConfirmed) {
                    removeTodo(todo.id);
                    Swal.fire('Deleted!', 'Todo has been deleted.', 'success');
                  }
                }}
              >
                Delete
              </button>
            </li>
          ))}
          <div className="flex justify-center items-center mt-4 gap-2">
            <button onClick={handlePrev} disabled={page === 1} className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50">Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={handleNext} disabled={page === totalPages} className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50">Next</button>
          </div>
        </div>
      )}
    </>
  );
}
