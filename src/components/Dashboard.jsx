import React, { useMemo } from "react";
import { useTodos } from "../hooks/useTodos";

function Dashboard() {

  const { tasks, counts } = useTodos();

  const recentTasks = useMemo(() => {
    return [...tasks].slice(-5).reverse();
  }, [tasks]);

  return (
    <div className="content">

      <section className="welcome">

        <div>

          <small>WELCOME TO</small>

          <h1>
            <span>To Do</span> App
          </h1>

          <p>
            Organize your tasks, track progress,
            and stay productive every day.
          </p>

          <div className="features">

            <div>
              🎯
              <b>Plan</b>
              <small>your tasks</small>
            </div>

            <div>
              🕐
              <b>Track</b>
              <small>progress</small>
            </div>

            <div>
              📊
              <b>Stay</b>
              <small>productive</small>
            </div>

            <div>
              📅
              <b>Meet</b>
              <small>deadlines</small>
            </div>

          </div>

        </div>

        <div className="hero-image">
          📋
        </div>

      </section>


      <div className="stats">

        <Stat
          title="Total Tasks"
          number={counts.total}
          icon="☷"
        />

        <Stat
          title="In Progress"
          number={counts.progress}
          icon="◷"
        />

        <Stat
          title="Finished"
          number={counts.finished}
          icon="✓"
        />

        <Stat
          title="Cancelled"
          number={counts.cancelled}
          icon="×"
        />

      </div>


      <div className="dashboard-grid">

        <div className="how">

          <h2>📖 How It Works?</h2>

          <p>
            Follow these simple steps to manage
            your tasks effectively.
          </p>

          <Step
            number="1"
            title="Add a To Do"
            text="Create a new task with title, description and due date."
          />

          <Step
            number="2"
            title="Track Progress"
            text="Move tasks to In Progress when you start working."
          />

          <Step
            number="3"
            title="Mark as Finished"
            text="Once the task is completed, mark it as Finished."
          />

          <Step
            number="4"
            title="Cancel if Needed"
            text="If the task is not needed, mark it as Cancelled."
          />

        </div>


        <div className="recent">

          <h2>◷ Recent Tasks</h2>

          {recentTasks.map((task) => (
            <div className="recent-task" key={task.id}>

              <span className="dot"></span>

              <div>
                <b>{task.title}</b>
                <small>{task.description}</small>
              </div>

              <small>{task.dueDate}</small>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}


function Stat({ title, number, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <small>{title}</small>
        <h2>{number}</h2>
        <span>
          {title === "Finished"
            ? "Completed tasks"
            : title === "In Progress"
            ? "Currently working"
            : title === "Cancelled"
            ? "Not done"
            : "All your tasks"}
        </span>
      </div>

    </div>
  );
}


function Step({ number, title, text }) {
  return (
    <div className="step">

      <div className="step-number">
        {number}
      </div>

      <div>
        <b>{title}</b>
        <p>{text}</p>
      </div>

    </div>
  );
}

export default Dashboard;