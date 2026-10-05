import { useEffect, useId, useRef, useState } from 'react'
import { CalendarDays, FileText, ListTodo, X } from 'lucide-react'
import { STATUSES } from '../data'

export default function TaskModal({ task, onClose, onSave }) {
  const titleId = useId()
  const titleRef = useRef(null)
  const [form, setForm] = useState({ title: '', description: '', dueDate: new Date().toISOString().slice(0, 10), status: 'To Do' })
  useEffect(() => { if (task) setForm({ title: task.title, description: task.description, dueDate: task.dueDate, status: task.status }); titleRef.current?.focus() }, [task])
  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  const change = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  const submit = event => { event.preventDefault(); onSave(task ? { ...task, ...form } : form) }
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose() }}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="task-modal-title">
      <header className="modal-heading"><span className="modal-icon"><ListTodo size={22} /></span><div><h2 id="task-modal-title">{task ? 'Edit To Do' : 'Add New To Do'}</h2><p>{task ? 'Update the details of your task.' : 'Create a new task by providing the details below.'}</p></div><button className="icon-button close-modal" onClick={onClose} aria-label="Close"><X /></button></header>
      <form onSubmit={submit} className="task-form">
        <label htmlFor={titleId}>Task Title <b>*</b></label><div className="input-with-icon"><FileText size={19} /><input ref={titleRef} id={titleId} name="title" required maxLength={80} placeholder="Enter a short title for your task..." value={form.title} onChange={change} /></div>
        <label htmlFor={`${titleId}-desc`}>Description <b>*</b></label><div className="input-with-icon textarea-wrap"><ListTodo size={20} /><textarea id={`${titleId}-desc`} name="description" required maxLength={300} placeholder="Enter task description..." value={form.description} onChange={change} /></div>
        <label htmlFor={`${titleId}-date`}>Due Date <b>*</b></label><div className="input-with-icon"><CalendarDays size={20} /><input id={`${titleId}-date`} type="date" name="dueDate" required value={form.dueDate} onChange={change} /></div>
        <label htmlFor={`${titleId}-status`}>Status <b>*</b></label><div className="input-with-icon select-wrap"><span className={`status-dot dot-${form.status.toLowerCase().replace(' ', '-')}`} /><select id={`${titleId}-status`} name="status" value={form.status} onChange={change}>{STATUSES.map(status => <option key={status}>{status}</option>)}</select></div>
        <footer className="modal-actions"><button className="button button-muted" type="button" onClick={onClose}>Cancel</button><button className="button button-primary" type="submit">{task ? 'Save Changes' : 'Add To Do'}</button></footer>
      </form>
    </section>
  </div>
}
