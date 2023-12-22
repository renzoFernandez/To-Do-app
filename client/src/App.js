import {
  HomePage,
  PostForm,
  NotFoundPage,
  Register,
  Login,
  ProfilePage,
  Posts,
} from "./pages/index";
import { Route, Routes } from "react-router-dom";
import { PostProvider } from "./context/postContext";
import { AuthProvider } from "./context/authContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoutes from "./ProtectedRoutes";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen ">
      <div className="px-10 container  mx-auto">
        <AuthProvider>
          <PostProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRoutes />}>
                <Route path="/posts" element={<Posts />} />
                <Route path="/new" element={<PostForm />} />
                <Route path="/posts/:id" element={<PostForm />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Toaster />
          </PostProvider>
        </AuthProvider>
      </div>
    </div>
  );
}
export default App;
