import { createContext, ReactNode, useEffect, useState } from "react";
import { TodoItem } from "./../types";

interface TodoContextType {
  todos: TodoItem[];
  //Function
  addTodo: () => void;
  toggleComplete: (id: string) => void;
  deleteTodoItem: (id: string) => void;

  //New Todos
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;

  //PopupCreate
  isCreate: boolean;
  setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
  togglePopupNewTodo: () => void;

  //Edit
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  editId: string;
  setEditId: React.Dispatch<React.SetStateAction<string>>;
  editById: () => void;
  editTodo: string;
  setEditTodo: React.Dispatch<React.SetStateAction<string>>;
}

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const [newTodo, setNewTodo] = useState("");
  const [isCreate, setIsCreate] = useState<boolean>(false);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
  const [editTodo, setEditTodo] = useState<string>("");

  useEffect(() => {
    // ดึง todos จาก localStorage
    const storedTodos = localStorage.getItem("TodoList");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);
  useEffect(() => {
    // บันทึก todos ลงใน localStorage
    localStorage.setItem("TodoList", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo != " ") {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed: false,
      };
      setTodos((prev) => [...prev, newTodoItem]);
      setNewTodo("");
    }
  };

  const toggleComplete = (id: string) => {
    const updateTodo = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updateTodo);
  };

  const deleteTodoItem = (id: string) => {
    const updateTodo = todos.filter((todo) => todo.id != id);
    setTodos(updateTodo);
  };
  const togglePopupNewTodo = () => {
    setIsCreate((prev) => !prev);
  };
  const editById = () => {
    const updateTodoItem = todos.map((todo) =>
      todo.id === editId ? { ...todo, text: editTodo } : todo
    );
    setTodos(updateTodoItem);
    setEditTodo("");
    setIsEdit(false);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        newTodo,
        setNewTodo,
        addTodo,
        toggleComplete,
        deleteTodoItem,
        isCreate,
        setIsCreate,
        togglePopupNewTodo,
        editById,
        editId,
        setEditId,
        isEdit,
        setIsEdit,
        editTodo,
        setEditTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
