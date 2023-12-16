import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./actions/authActions";
import Register from "./pages/Registre";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Posts } from "./pages/Post";
import PostForm from "./pages/PostForm";
import Profile from "./pages/Profile";
import { PostDetail } from "./pages/PostDetail"; 
import { PostProvider } from "./actions/postsActions";
import { ProtectedRoute } from "./protectedRoute";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/add-post" element={<PostForm />} />
            <Route path="/posts/:id" element={<PostDetail />} /> {/* Utiliza el nuevo componente para el detalle del post */}
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
}

export default App;