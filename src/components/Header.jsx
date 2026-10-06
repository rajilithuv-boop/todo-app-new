import React, {
  useCallback,
  useRef,
} from "react";

function Header({ search, setSearch }) {

  const inputRef = useRef();

  const clearSearch = useCallback(() => {
    setSearch("");
    inputRef.current?.focus();
  }, [setSearch]);

  return (
    <header className="header">

      <div className="search-box">

        🔍

        <input
          ref={inputRef}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks, status, or keywords..."
        />

        {search && (
          <button onClick={clearSearch}>
            ✕
          </button>
        )}

      </div>

      <div className="user">

        <span className="notification">
          🔔
        </span>

        <img
          src="https://i.pravatar.cc/100?img=47"
          alt="profile"
        />

        <span>Raji</span>

      </div>

    </header>
  );
}

export default Header;