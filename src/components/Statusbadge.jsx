import { Circle, CircleCheck, CircleX, Clock3 } from 'lucide-react'
const icons = { 'To Do': Circle, 'In Progress': Clock3, Finished: CircleCheck, Cancelled: CircleX }
export default function StatusBadge({ status }) {
  const Icon = icons[status] || Circle
  return <span className={`status status-${status.toLowerCase().replace(' ', '-')}`}><Icon size={14} strokeWidth={2.4} />{status}</span>
}