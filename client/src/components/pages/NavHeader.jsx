import React from "react";
import { Link } from "react-router";
import { useContext } from "react";
import { userContext } from "../context/UserContext";


const NavHeader = () => {
  const { user, logout } = useContext(userContext);
  return (
    <header className="nav-header">
      <Link className="logo" to="/">
        Mo-Blog
      </Link>

      <nav className="nav-link">
        {user?.username ? (
          <>
            <Link to="/create/post" className="link">
              Write
            </Link>

            {user.img ? (
              <>
                <Link to="/setting/profile">
                  <img
                    className="topImg"
                    src={`http://localhost:3001/uploads/${user.img}`}
                  />
                </Link>
              </>
            ) : (
              <>
                <Link to="/setting/profile" className="link">
                  Setting
                </Link>
              </>
            )}

            <Link onClick={logout} className="link">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="link">
              Register
            </Link>
            <Link to="/login" className="link">
              Login
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default NavHeader;
