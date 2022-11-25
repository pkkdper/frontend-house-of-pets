import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/auth.context";
import axios from "axios";
import Navbar from "../components/Navbar";
const API_URL="http://localhost:5005/"
const LoginPage = (props) => {
  const navigate = useNavigate()
  const { storeToken } = useContext(AuthContext);
const LoginPage = () => {
  const { setToken } = useContext(SessionContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post("http://localhost:5005/auth/login", {
      username,
      password,
    })
    await((response)=> {
      console.log(response.data.authToken)
    });
    console.log(response.data);

    if (response) {
      navigate("/auth/profile");
    } else {
      const errorDescription = error.response.data.message;
      setError(errorDescription);
    }

    const parsed = response.data;
    navigate('/auth/profile');
    // if (parsed.status === 200) {
    //   setToken(parsed.token);
    // } else {
    //   setError(parsed);
    // }
  };

  return (<>
  <Navbar/>
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
  </>);
};}

export default LoginPage;
