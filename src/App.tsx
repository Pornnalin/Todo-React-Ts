import { MdOutlineWbSunny } from "react-icons/md";
import { FaRegMoon } from "react-icons/fa";
import ShowTodos from "./components/ShowTodos";
import { IoAdd } from "react-icons/io5";
import { TodoContext } from "./context/TodoContext";
import { useContext } from "react";
import { TodoFilterContext } from "./context/TodoFilter";
import { ThemeContext } from "./context/ThemeContext";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
function App() {
  const todoContext = useContext(TodoContext);
  const todoFilterContext = useContext(TodoFilterContext);
  const themeContext = useContext(ThemeContext);

  return (
    <div
      className={`${
        themeContext?.isDarkTheme ? "bg-backgroundDark" : "bg-backgroundLight"
      } min-h-screen w-screen leading-relaxed tracking-wider overflow-hidden transition-all duration-500`}
    >
      <div className="w-full max-w-6xl flex flex-col justify-center items-center gap-4 mx-auto py-10 px-4 md:px-6">
        <h1
          className={`uppercase font-bold text-3xl ${
            themeContext?.isDarkTheme
              ? "text-backgroundLight"
              : "text-backgroundDark"
          } `}
        >
          todo list
        </h1>
        <div className="w-full flex flex-col md:flex-row gap-4 justify-center ">
          <form action="" className="flex-grow">
            {/* search */}
            <div className="relative">
              <input
                type="search"
                name=""
                id=""
                value={todoFilterContext?.search}
                onChange={(e) => todoFilterContext?.setSearch(e.target.value)}
                placeholder="Search note..."
                className={`w-[100%] bg-transparent rounded-md border-[2px] py-1 px-2 focus:outline-none transition-all font-semibold duration-500 ${
                  themeContext?.isDarkTheme
                    ? " border-white  text-backgroundLight"
                    : " border-primary  text-primary"
                }`}
              />
              <span
                className={`absolute transition-all right-5 top-1/4  duration-500 text-xl ${
                  themeContext?.isDarkTheme
                    ? "   text-backgroundLight"
                    : "   text-primary"
                }`}
              >
                <HiOutlineMagnifyingGlass />
              </span>
            </div>
          </form>
          <div className="flex gap-4">
            <select
              className="bg-primary text-backgroundLight font-semibold  rounded-md px-2 outline-none hover:bg-primary "
              value={todoFilterContext?.status}
              onChange={(e) => {
                e.preventDefault();
                todoFilterContext?.setStatus(e.target.value);
              }}
            >
              <option
                value="All"
                className="bg-backgroundLight text-primary font-semibold "
              >
                All
              </option>
              <option
                value="Completed"
                className="bg-backgroundLight text-primary font-semibold"
              >
                Completed
              </option>
              <option
                value="InCompleted"
                className="bg-backgroundLight text-primary font-semibold"
              >
                InCompleted
              </option>
            </select>
            <span
              className="cursor-pointer px-4 py-2 bg-primary rounded-md text-backgroundLight font-semibold "
              onClick={themeContext?.toggleTheme}
            >
              {themeContext?.isDarkTheme ? (
                <MdOutlineWbSunny className="text-xl" />
              ) : (
                <FaRegMoon className="text-xl" />
              )}
            </span>
          </div>
        </div>
        <div className="w-full min-h-[40vh]">
          {todoContext?.todos.length ? (
            <ShowTodos />
          ) : (
            <div>
              <p
                className={`transition-all duration-500 text-center font-semibold uppercase text-xl py-2 ${
                  themeContext?.isDarkTheme
                    ? "  text-backgroundLight"
                    : " text-backgroundDark"
                }`}
              >
                Empty...
              </p>
            </div>
          )}
        </div>
        <div className="w-full py-[30px] pr-[70px] flex justify-end">
          <button
            className="rounded-full bg-primary text-backgroundLight"
            onClick={(e) => {
              e.preventDefault();
              todoContext?.togglePopupNewTodo();
            }}
          >
            <IoAdd className="text-4xl" />
          </button>
        </div>

        {/* popUp */}
        <div
          className={`fixed w-screen h-screen items-start justify-center bg-backgroundDark inset-0 bg-opacity-70 pt-40 ${
            todoContext?.isCreate ? "flex" : "hidden"
          }`}
        >
          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              if (todoContext?.newTodo) {
                todoContext?.addTodo();
                todoContext?.setNewTodo("");
                todoContext?.togglePopupNewTodo();
              } else {
                alert("Please input");
              }
            }}
            className="flex flex-col gap-4 border justify-start items-center w-full max-w-lg mx-auto px-10 py-4 rounded-md bg-backgroundDark"
          >
            <p className="uppercase text-xl font-semibold text-backgroundLight">
              new note
            </p>
            <input
              type="text"
              name=""
              id=""
              value={todoContext?.newTodo}
              placeholder="Input your note..."
              onChange={(e) => todoContext?.setNewTodo(e.target.value)}
              className="w-full bg-transparent rounded-md border-white border text-backgroundLight py-1 px-2"
            />
            <div className="flex justify-between w-full mt-32">
              <button
                className="uppercase text-primary font-semibold bg-transparent py-1 px-4   border-primary border-2  rounded-md"
                onClick={(e) => {
                  e.preventDefault();
                  todoContext?.togglePopupNewTodo();
                  todoContext?.setNewTodo("");
                }}
                type="button"
              >
                cancel
              </button>
              <button
                className=" uppercase text-backgroundLight font-semibold bg-primary py-1 px-4 rounded-md"
                type="submit"
              >
                apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
