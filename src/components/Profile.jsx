import React from "react";

function Profile() {

  return (
    <div className="content">

      <div className="profile-card">

        <img
          src="https://i.pravatar.cc/200?img=47"
          alt="Raji"
        />

        <h1>Raji</h1>

        <p>React Developer</p>

        <div className="profile-info">

          <div>
            <b>Name</b>
            <span>Raji</span>
          </div>

          <div>
            <b>Email</b>
            <span>raji@example.com</span>
          </div>

          <div>
            <b>Role</b>
            <span>Developer</span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;