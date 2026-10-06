import { useCallback, useMemo } from "react";
import { useTodoContext } from "../context/TodoContext";

export function useTodos() {
  const { tasks, dispatch } = useTodoContext();

  const addTask = useCallback((task) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        ...task,
        id: Date.now(),
      },
    });
  }, [dispatch]);

  const deleteTask = useCallback((id) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }, [dispatch]);

  const updateTask = useCallback((task) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: task,
    });
  }, [dispatch]);

  const changeStatus = useCallback((id, status) => {
    dispatch({
      type: "CHANGE_STATUS",
      payload: {
        id,
        status,
      },
    });
  }, [dispatch]);

  const counts = useMemo(() => {
    return {
      total: tasks.length,

      todo: tasks.filter(
        (task) => task.status === "To Do"
      ).length,

      progress: tasks.filter(
        (task) => task.status === "In Progress"
      ).length,

      finished: tasks.filter(
        (task) => task.status === "Finished"
      ).length,

      cancelled: tasks.filter(
        (task) => task.status === "Cancelled"
      ).length,
    };
  }, [tasks]);

  return {
    tasks,
    counts,
    addTask,
    deleteTask,
    updateTask,
    changeStatus,
  };
}