import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import { useTodos } from "../hooks/useTodos";
import TaskModal from "./TaskModal";

function TodoList({ filter = "All" }) {

  const {
    tasks,
    counts,
    addTask,
    deleteTask,
    updateTask,
  } = useTodos();

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = useMemo(() => {

    return tasks.filter((task) => {

      const statusMatch =
        filter === "All" ||
        task.status === filter;

      const searchMatch =
        task.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        task.description
          .toLowerCase()
          .includes(search.toLowerCase());

      return statusMatch && searchMatch;
    });

  }, [tasks, filter, search]);


  const handleEdit = useCallback((task) => {
    setEditingTask(task);
    setShowModal(true);
  }, []);


  const handleDelete = useCallback((id) => {

    if (
      window.confirm(
        "Are you sure you want to delete this task?"
      )
    ) {
      deleteTask(id);
    }

  }, [deleteTask]);


  function openAddModal() {
    setEditingTask(null);
    setShowModal(true);
  }


  return (
    <div className="content">

      <div className="page-title">

        <div>
          <h1>To Do List</h1>
          <p>
            Manage your tasks, track progress,
            and stay productive.
          </p>
        </div>

        <button
          className="add-task"
          onClick={openAddModal}
        >
          + Add To Do
        </button>

      </div>


      <div className="stats">

        <Stat title="To Do" number={counts.todo} />
        <Stat title="In Progress" number={counts.progress} />
        <Stat title="Finished" number={counts.finished} />
        <Stat title="Cancelled" number={counts.cancelled} />

      </div>


      <div className="task-container">

        <div className="task-toolbar">

          <h2>
            All Tasks ({filteredTasks.length})
          </h2>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search tasks..."
          />

        </div>


        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>#</th>
                <th>Task Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {filteredTasks.map((task, index) => (

                <tr key={task.id}>

                  <td>{index + 1}</td>

                  <td>
                    <b>{task.title}</b>
                  </td>

                  <td>{task.description}</td>

                  <td>{task.dueDate}</td>

                  <td>
                    <span
                      className={`status ${task.status
                        .replace(" ", "-")
                        .toLowerCase()}`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td>

                    <button
                      className="action edit"
                      onClick={() =>
                        handleEdit(task)
                      }
                    >
                      ✎
                    </button>

                    <button
                      className="action delete"
                      onClick={() =>
                        handleDelete(task.id)
                      }
                    >
                      🗑
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>


      {showModal && (
        <TaskModal
          closeModal={() => setShowModal(false)}
          addTask={addTask}
          editingTask={editingTask}
          updateTask={updateTask}
        />
      )}

    </div>
  );
}


function Stat({ title, number }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">●</div>

      <div>
        <small>{title}</small>
        <h2>{number}</h2>
      </div>
    </div>
  );
}

export default TodoList;