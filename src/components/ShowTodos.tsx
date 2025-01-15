import { RiDeleteBin2Line } from "react-icons/ri";
import { HiOutlinePencil } from "react-icons/hi";
import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";
import { TodoFilterContext } from "../context/TodoFilter";
import { ThemeContext } from "../context/ThemeContext";

function ShowTodos() {
  const todoContext = useContext(TodoContext);
  const todoFilterContext = useContext(TodoFilterContext);
  const themeContext = useContext(ThemeContext);

  return (
    <div className="w-full md:px-16">
      <ul
        className={`transition-all duration-500 ${
          themeContext?.isDarkTheme
            ? "text-backgroundLight"
            : " text-backgroundDark"
        }`}
      >
        {todoFilterContext?.filterTodos.map((todo, index) => (
          <li
            key={todo.id}
            className="flex gap-10 justify-between items-center border-b-primary border-b-[1px] py-3"
          >
            <div className="flex gap-7 justify-center items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                className="w-6 h-6 accent-primary"
                onChange={() => todoContext?.toggleComplete(todo.id)}
              />
              {todoContext?.isEdit && todoContext?.editId === todo.id ? (
                <form
                  className="flex gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    todoContext.editById();
                  }}
                >
                  <input
                    type="text"
                    value={todoContext?.editTodo}
                    placeholder={todoContext?.todos[Number(todo.id)].text}
                    onChange={(e) => {
                      e.preventDefault();
                      todoContext?.setEditTodo(e.target.value);
                    }}
                    className="rounded-md bg-transparent border text-backgroundLight"
                  />
                  <button
                    type="submit"
                    className="rounded-md bg-primary text-backgroundLight px-4 py-1"
                  >
                    Update
                  </button>
                </form>
              ) : (
                <span
                  className={`inline-block font-semibold text-xl capitalize  ${
                    todo.completed ? "line-through text-gray-600" : ""
                  }`}
                >
                  {todo.text} #{index + 1}
                </span>
              )}
            </div>
            <div className="flex gap-4 justify-center items-center">
              <button className="hover:text-primary">
                <HiOutlinePencil
                  className="text-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    todoContext?.setIsEdit((prev) => !prev);
                    todoContext?.setEditId(todo.id);
                  }}
                />
              </button>
              <button
                className="hover:text-red-500"
                onClick={() => todoContext?.deleteTodoItem(todo.id)}
              >
                <RiDeleteBin2Line className="text-xl" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShowTodos;
