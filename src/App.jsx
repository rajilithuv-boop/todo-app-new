import React, {
  useCallback,
  useState,
} from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import TodoList from "./components/TodoList";
import Profile from "./components/Profile";

function App() {

  const [page, setPage] = useState("Home");
  const [search, setSearch] = useState("");

  const changePage = useCallback((newPage) => {
    setPage(newPage);
  }, []);


  function renderPage() {

    switch (page) {

      case "Home":
        return <Dashboard />;

      case "To Do List":
        return <TodoList filter="All" />;

      case "In Progress":
        return <TodoList filter="In Progress" />;

      case "Finished":
        return <TodoList filter="Finished" />;

      case "Cancelled":
        return <TodoList filter="Cancelled" />;

      case "Profile":
        return <Profile />;

      case "Settings":
        return (
          <div className="content">
            <h1>Settings</h1>
            <p>Application settings</p>
          </div>
        );

      default:
        return <Dashboard />;
    }
  }


  return (
    <div className="app">

      <Sidebar
        page={page}
        setPage={changePage}
      />

      <main className="main">

        <Header
          search={search}
          setSearch={setSearch}
        />

        {renderPage()}

      </main>

    </div>
  );
}

export default App;