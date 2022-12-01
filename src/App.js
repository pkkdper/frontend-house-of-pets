import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Animal from "./pages/animal";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Profile from "./pages/profile";
import Main from "./pages/main";
import { useContext, useState } from "react";
import { AuthContext } from "./contexts/auth.context";
import Footer from "./components/Footer";

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const [status, setStatus] = useState(false);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/profile" element={<Profile />} />
        <Route path="/auth/animal" element={<Animal />} />
        <Route path="/auth/main" element={<Main />} />
        <Route path="/auth/footer" element={<Footer />} />
      </Routes>
    </div>
  );
}

export default App;
