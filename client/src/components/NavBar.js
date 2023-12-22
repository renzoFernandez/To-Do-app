import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { usePost } from "../context/postContext";

export const NavBar = () => {
  const { isAuthenticated, logout, userLog } = useAuth();
  const { setPosts } = usePost();
  const location = useLocation();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg text-white">
      {location.pathname === "/" ? (
        <h1 className="text-2xl font-bold">
          <Link to="/posts">My posts</Link>
        </h1>
      ) : (
        <h1 className="text-2xl font-bold">
          <Link to="/">Post Manager</Link>
        </h1>
      )}

      {isAuthenticated && (
        <h1 className="text-2xl font-sans underline decoration-indigo-500">
          Welcome {userLog.username}
        </h1>
      )}
      <ul className="flex justify-between gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              <Link
                to="/"
                onClick={() => {
                  logout();
                  setPosts([]);
                }}
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
