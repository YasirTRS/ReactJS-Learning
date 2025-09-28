import { useSelector, useDispatch } from "react-redux"
import { updateTodo } from "../features/todo/todoSlice";
import Swal from "sweetalert2";
import { removeTodo, toggleCompleted } from "../features/todo/todoSlice"
import { useState } from "react";


export default function Todos() {
    const [editModal, setEditModal] = useState({ open: false, todo: null });
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const totalPages = Math.ceil(todos.length / pageSize);
    const paginatedTodos = todos.slice((page - 1) * pageSize, page * pageSize);

    const removeHandler = async (id) => {
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
            dispatch(removeTodo(id));
            Swal.fire('Deleted!', 'Todo has been deleted.', 'success');
        }
    }
    const toggleHandler = (id) => {
        dispatch(toggleCompleted(id));
    }
    const handlePrev = () => setPage((p) => Math.max(1, p - 1));
    const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

    return (
        <>
            <div className='text-2xl font-bold text-gray-300 mb-4 mt-6'>My Todos</div>
            {
                !todos?.length ?
                    (<div className="text-red-500 text-left border p-2 border-red-900 rounded">No Todos Found</div>)
                :
                    <div>
                        {paginatedTodos.map(todo => (
                            <li key={todo.id} className='bg-gray-700 p-2 my-2 flex justify-between items-center rounded'>
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={todo.is_completed}
                                        onChange={() => toggleHandler(todo.id)}
                                        className="mr-2 accent-green-500"
                                    />
                                    <span className={todo.is_completed ? 'line-through text-gray-400' : ''}>{todo.text}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className='btn bg-yellow-500 text-white rounded text-xs py-1 px-2 cursor-pointer' onClick={() => setEditModal({ open: true, todo })}>Edit</button>
                                    <button className='btn bg-red-600 text-white rounded text-xs py-1 px-2 cursor-pointer' onClick={() => removeHandler(todo.id)}>Delete</button>
                                </div>
                            </li>
                        ))}
            {/* Edit Modal */}
            {editModal.open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-6 rounded shadow-lg min-w-[300px]">
                        <h3 className="text-xl font-bold mb-4 text-white">Edit Todo</h3>
                        <form onSubmit={e => {
                            e.preventDefault();
                            if (!editModal.todo.text.trim()) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Input Required',
                                    text: 'Something should be available in input',
                                });
                                return;
                            }
                            dispatch(updateTodo({
                                id: editModal.todo.id,
                                text: editModal.todo.text,
                                is_completed: editModal.todo.is_completed
                            }));
                            setEditModal({ open: false, todo: null });
                            Swal.fire('Updated!', 'Todo has been updated.', 'success');
                        }}>
                            <input
                                type="text"
                                className="w-full p-2 mb-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
                                value={editModal.todo.text}
                                onChange={e => setEditModal(modal => ({ ...modal, todo: { ...modal.todo, text: e.target.value } }))}
                            />
                            <label className="flex items-center mb-4">
                                <input
                                    type="checkbox"
                                    checked={editModal.todo.is_completed}
                                    onChange={e => setEditModal(modal => ({ ...modal, todo: { ...modal.todo, is_completed: e.target.checked } }))}
                                    className="mr-2 accent-green-500"
                                />
                                <span className="text-white">Completed</span>
                            </label>
                            <div className="flex gap-2 justify-end">
                                <button type="button" className="bg-gray-600 text-white px-3 py-1 rounded" onClick={() => setEditModal({ open: false, todo: null })}>Cancel</button>
                                <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
                        <div className="flex justify-center items-center mt-4 gap-2">
                            <button onClick={handlePrev} disabled={page === 1} className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50">Prev</button>
                            <span>Page {page} of {totalPages}</span>
                            <button onClick={handleNext} disabled={page === totalPages} className="px-3 py-1 rounded bg-gray-700 text-white disabled:opacity-50">Next</button>
                        </div>
                    </div>
            }
        </>
    )
}
