import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const API_URL = "https://nervous-pocketbook-ox.cyclic.app";

function Signup() {
  // States for registration
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("yes");
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }),
      }
    );
    const parsed = await response.json();
    console.log(parsed);
    navigate("/auth/login");

    if (username === "" || email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {username} successfully registered!!</h1>
      </div>
    );
  };
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="formBox">
        <div className="form">
          {/* Calling to the methods */}
          <div className="messages">
            {errorMessage()}
            {successMessage()}
          </div>

          <form className="signupstyle">
            {/* Labels and inputs for form data */}
            <label >Name</label>
            <input
              onChange={handleName}
              
              value={username}
              type="text"
            />

            <label >Email</label>
            <input
              onChange={handleEmail}
              
              value={email}
              type="email"
            />

            <label >Password</label>
            <input
              onChange={handlePassword}
              
              value={password}
              type="password"
            />
            <div className="container">
              <button onClick={handleSubmit} className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default Signup;
