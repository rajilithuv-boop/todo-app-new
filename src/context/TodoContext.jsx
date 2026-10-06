import {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const TodoContext = createContext();

const initialTasks = [
  {
    id: 1,
    title: "Learn MongoDB",
    description: "Study basic CRUD operations",
    dueDate: "2026-09-25",
    status: "To Do",
  },
  {
    id: 2,
    title: "Build To Do App",
    description: "Create a React To Do application",
    dueDate: "2026-09-28",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Complete Project",
    description: "Finish and deploy the project",
    dueDate: "2026-09-30",
    status: "Finished",
  },
  {
    id: 4,
    title: "Write Documentation",
    description: "Add README and usage guide",
    dueDate: "2026-10-02",
    status: "Cancelled",
  },
  {
    id: 5,
    title: "Prepare Presentation",
    description: "Create slides for final review",
    dueDate: "2026-10-05",
    status: "To Do",
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id
          ? action.payload
          : task
      );

    case "CHANGE_STATUS":
      return state.map((task) =>
        task.id === action.payload.id
          ? {
              ...task,
              status: action.payload.status,
            }
          : task
      );

    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [tasks, dispatch] = useReducer(
    todoReducer,
    initialTasks,
    (initial) => {
      const saved = localStorage.getItem("todoTasks");

      return saved ? JSON.parse(saved) : initial;
    }
  );

  // Save tasks
  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TodoContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  return useContext(TodoContext);
}