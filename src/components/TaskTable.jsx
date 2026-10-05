import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Pencil, Search, Trash2 } from 'lucide-react'
import StatusBadge from './StatusBadge'

export function formatDate(value) { if (!value) return '—'; return new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`)) }
export default function TaskTable({ tasks, onEdit, onDelete, initialSearch = '' }) {
  const [query, setQuery] = useState(initialSearch)
  const [page, setPage] = useState(1)
  const pageSize = 7
  useEffect(() => { setQuery(initialSearch); setPage(1) }, [initialSearch])
  const filtered = useMemo(() => tasks.filter(task => `${task.title} ${task.description} ${task.status}`.toLowerCase().includes(query.toLowerCase())), [tasks, query])
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const rows = filtered.slice((page - 1) * pageSize, page * pageSize)
  return <section className="table-card card">
    <div className="table-toolbar"><h2>All Tasks <span>({filtered.length})</span></h2><label className="small-search"><Search size={19} /><input aria-label="Search tasks" placeholder="Search tasks..." value={query} onChange={e => { setQuery(e.target.value); setPage(1) }} /></label></div>
    <div className="table-scroll"><table><thead><tr><th>#</th><th>Task Title</th><th>Description</th><th>Due Date</th><th>Status</th><th className="actions-heading">Actions</th></tr></thead>
      <tbody>{rows.map((task, index) => <tr key={task.id}><td>{(page - 1) * pageSize + index + 1}</td><td className="task-title-cell">{task.title}</td><td className="description-cell">{task.description}</td><td>{formatDate(task.dueDate)}</td><td><StatusBadge status={task.status} /></td><td><div className="row-actions"><button className="icon-button" title="Edit task" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}><Pencil size={17} /></button><button className="icon-button danger-icon" title="Delete task" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task)}><Trash2 size={18} /></button></div></td></tr>)}
      {!rows.length && <tr><td colSpan="6" className="empty-row">No tasks match your search.</td></tr>}</tbody></table></div>
    <footer className="table-footer"><span>Showing {filtered.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filtered.length)} of {filtered.length} tasks</span><div className="pagination"><button className="icon-button" aria-label="Previous page" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}><ChevronLeft size={18} /></button><span>Page {page} of {pages}</span><button className="icon-button" aria-label="Next page" disabled={page >= pages} onClick={() => setPage(p => Math.min(pages, p + 1))}><ChevronRight size={18} /></button></div></footer>
  </section>
}
