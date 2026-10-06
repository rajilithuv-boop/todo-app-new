import React from "react";
import {
  Home,
  ListTodo,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Settings,
} from "lucide-react";

function Sidebar({ page, setPage }) {
  const menu = [
    {
      name: "Home",
      icon: <Home />,
    },
    {
      name: "To Do List",
      icon: <ListTodo />,
    },
    {
      name: "In Progress",
      icon: <Clock />,
    },
    {
      name: "Finished",
      icon: <CheckCircle />,
    },
    {
      name: "Cancelled",
      icon: <XCircle />,
    },
    {
      name: "Profile",
      icon: <User />,
    },
    {
      name: "Settings",
      icon: <Settings />,
    },
  ];

  return (
    <aside className="sidebar">

      <h1 className="logo">
        <span>To Do</span> App
      </h1>

      <div className="menu">

        {menu.map((item) => (
          <button
            key={item.name}
            className={
              page === item.name
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() => setPage(item.name)}
          >
            {item.icon}
            <span>{item.name}</span>
          </button>
        ))}

      </div>

    </aside>
  );
}

export default Sidebar;