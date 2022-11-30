import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import axios from "axios";
import Navbar from "../components/Navbar";
const API_URL = "http://localhost:5005/";
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
      <form onSubmit={handleSubmit}>
        {error?.message && <p>{error.message}</p>}
        <TextInput
          label="Username"
          variant="filled"
          size="md"
          withAsterisk
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <PasswordInput
          label="Password"
          variant="filled"
          size="md"
          withAsterisk
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <Button type="submit" variant="light" color="cyan" size="md" uppercase>
          Login
        </Button>
      </form>
    </>
  );
};
export default LoginPage;
