import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const LoginPage = (props) => {
  const navigate = useNavigate();
  // const { storeToken } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        username,
        password,
      })
      .then((response) => {
        storeToken(response.data.token);
        authenticateUser();
        const parsed = response.data;
        console.log(parsed);
        navigate("/auth/main");
      })
      // await((response)=> {
      //   console.log(response.data.authToken)
      // });
      /*
    if (response) {
      navigate("/auth/profile:id");
    } else {
      const errorDescription = error.response.data.message;
      setError(errorDescription);
    } */
      /*      if (parsed.status === 200) {
       setToken(parsed.token);
     } else {
      setError(parsed);
     } */
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  return (
    <>
      <Navbar />
      <div className="formBox">
        <div className="form">
        <form className="loginstyle" onSubmit={handleSubmit}>
          {error?.message && <p>{error.message}</p>}
          <label> Username</label>
          <input
            className="TextInput"
            label="Username"
            variant="filled"
            size="sm"
            withasterisk="true"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          <label>Password</label>
          <input
            className="PasswordInput"
            label="Password"
            type="password"
            variant="filled"
            size="xl"
            withasterisk="true"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <div className="container">
            <button
              className="btn"
              type="submit"
              variant="light"
              color="cyan"
              size="md"
              uppercase="true"
            >
              Login
            </button>
          </div>
        </form></div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
};
export default LoginPage;
