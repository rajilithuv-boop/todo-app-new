import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { SEED_TASKS } from '../data';

const TodoContext = createContext(null)
const STORAGE_KEY = 'blue-todo-tasks-v1'
function readTasks() {
  try { const value = JSON.parse(localStorage.getItem(STORAGE_KEY)); return Array.isArray(value) ? value : SEED_TASKS }
  catch { return SEED_TASKS }
}
function reducer(state, action) {
  switch (action.type) {
    case 'add': return [action.task, ...state]
    case 'update': return state.map(task => task.id === action.task.id ? action.task : task)
    case 'delete': return state.filter(task => task.id !== action.id)
    default: return state
  }
}
export function TodoProvider({ children }) {
  const [tasks, dispatch] = useReducer(reducer, undefined, readTasks)
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)) }, [tasks])
  const addTask = useCallback(task => dispatch({ type: 'add', task: { ...task, id: crypto.randomUUID() } }), [])
  const updateTask = useCallback(task => dispatch({ type: 'update', task }), [])
  const deleteTask = useCallback(id => dispatch({ type: 'delete', id }), [])
  const value = useMemo(() => ({ tasks, addTask, updateTask, deleteTask }), [tasks, addTask, updateTask, deleteTask])
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
}
export function useTodos() {
  const context = useContext(TodoContext)
  if (!context) throw new Error('useTodos must be used inside TodoProvider')
  return context
}
