import { useState } from "react";
import { useDispatch } from "react-redux"
import { addTodo } from "../features/todo/todoSlice"

export default function AddTodo() {
  const [todoInput, setTodoInput] = useState("");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
  e.preventDefault();
  // Add is_completed as false when dispatching
  dispatch(addTodo(todoInput)); // is_completed is set in the slice
  setTodoInput("");

  }
  return (
    <>
        <div className='text-4xl font-bold text-gray-300 my-7'>Todo List App</div>
        <form className='my-4 flex justify-center' onSubmit={submitHandler}>
            <input type="text" placeholder='Add Todo' className='p-2 rounded-l bg-gray-700 text-white border border-gray-600 focus:outline-none' value={todoInput} onChange={(e)=> setTodoInput(e.target.value)}/>
            <button className='bg-blue-600 text-white rounded-r px-4 py-2 border border-blue-700 hover:bg-blue-700'>Add</button>
        </form>
    </>
  )
}
