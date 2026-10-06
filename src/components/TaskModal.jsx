import React, {
  useEffect,
  useRef,
  useState,
} from "react";

function TaskModal({
  closeModal,
  addTask,
  editingTask,
  updateTask,
}) {

  const titleRef = useRef();

  const [form, setForm] = useState({
    title: editingTask?.title || "",
    description: editingTask?.description || "",
    dueDate:
      editingTask?.dueDate ||
      new Date().toISOString().split("T")[0],
    status: editingTask?.status || "To Do",
  });

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  function handleChange(e) {

    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(e) {

    e.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter task title");
      return;
    }

    if (editingTask) {

      updateTask({
        ...editingTask,
        ...form,
      });

    } else {

      addTask(form);

    }

    closeModal();
  }

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <div>
            <h2>
              {editingTask
                ? "Edit To Do"
                : "Add New To Do"}
            </h2>

            <p>
              Create a new task by providing
              the details below.
            </p>
          </div>

          <button onClick={closeModal}>
            ✕
          </button>

        </div>


        <form onSubmit={handleSubmit}>

          <label>Task Title *</label>

          <input
            ref={titleRef}
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter a short title for your task..."
          />


          <label>Description *</label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter task description..."
          />


          <label>Due Date *</label>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />


          <label>Status *</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Finished</option>
            <option>Cancelled</option>
          </select>


          <div className="modal-buttons">

            <button
              type="button"
              className="cancel-btn"
              onClick={closeModal}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-btn"
            >
              {editingTask
                ? "Update To Do"
                : "Add To Do"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default TaskModal;