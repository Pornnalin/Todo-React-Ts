// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TodoProvider } from "./context/TodoContext.tsx";
import { TodoFilterProvider } from "./context/TodoFilter.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <TodoProvider>
    <TodoFilterProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </TodoFilterProvider>
  </TodoProvider>
  // </StrictMode>
);
