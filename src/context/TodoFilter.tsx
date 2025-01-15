import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import { TodoItem } from "./../types";
import { TodoContext } from "./TodoContext";

interface TodoFilterContextType {
  getFilterTodos: () => TodoItem[];
  filterTodos: TodoItem[];
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

interface TodoFilterProviderProps {
  children: ReactNode;
}

export const TodoFilterContext = createContext<
  TodoFilterContextType | undefined
>(undefined);

export function TodoFilterProvider({ children }: TodoFilterProviderProps) {
  const todoContext = useContext(TodoContext);

  if (!todoContext) {
    throw new Error("TodoContext is not available.");
  }
  const [filterTodos, setFilterTodos] = useState<TodoItem[]>(
    todoContext?.todos
  );
  const [status, setStatus] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const getFilterTodos = (): TodoItem[] => {
    switch (status) {
      case "Completed":
        return todoContext?.todos.filter((item) => item.completed);
      case "InCompleted":
        return todoContext?.todos.filter((item) => !item.completed);
      case "All":
        return todoContext?.todos;
      default:
        return [];
    }
  };

  useEffect(() => {
    setFilterTodos(getFilterTodos());
  }, [todoContext?.todos, status]);

  useEffect(() => {
    const filterSearch = todoContext?.todos.filter((item) =>
      item.text.toLowerCase().includes(search.toLowerCase())
    );
    setFilterTodos(filterSearch);
  }, [search]);

  return (
    <TodoFilterContext.Provider
      value={{
        getFilterTodos,
        filterTodos,
        status,
        setStatus,
        search,
        setSearch,
      }}
    >
      {children}
    </TodoFilterContext.Provider>
  );
}
