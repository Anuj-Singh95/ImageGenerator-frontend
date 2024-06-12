// import React from "react";

// export default function LoginPage() {
//   return (
//     <div className="login-page">
//       <div className="login-container">

//       </div>
//     </div>
//   );
// }

import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./LoginPage.css";
import bgImage from "../../images/background.jpg";
import { Link, Navigate } from "react-router-dom";

export default function Signup() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const emailChangeHandler = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  };
  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const postData = async () => {
    const url = `${process.env.REACT_APP_URI}/api/v1/signup`; // Replace with your API endpoint
    console.log(url);
    console.log(email);
    console.log(password);
    const data = {
      email,
      password,
      name,
    }; // Replace with the data you want to send

    try {
      const response = await fetch(url, {
        method: "POST", // Use POST method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(data), // Convert the data to JSON string
      });
      const result = await response.json();
      console.log(result.success);
      if (result) localStorage.setItem("token", result.token);
      setResponse(result); // Set the response state with the result
    } catch (err) {
      setError(err.toString()); // Set the error state
      console.log(err.message);
    }
  };
  if (response !== null && localStorage.getItem("token") !== "undefined") {
    // console.log("ok" + response.ok);
    console.log(localStorage.getItem("token"));
    return <Navigate to="/" />;
  }
  return (
    <div className="login-page" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="login-container signup">
        <h3>Create an Account</h3>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "40ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="input-fields">
            <div>
              <TextField
                id="standard-name-input"
                label="name"
                type="text"
                autoComplete="current-name"
                variant="standard"
                onChange={nameChangeHandler}
              />
            </div>
            <div>
              <TextField
                id="standard-email-input"
                label="Email"
                type="text"
                autoComplete="current-email"
                variant="standard"
                onChange={emailChangeHandler}
              />
            </div>
            <div>
              <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                onChange={passwordChangeHandler}
              />
            </div>
            <p style={{ color: "red" }}>
              {response !== null && "Enter unique email"}
            </p>
            <p style={{ color: "red" }}>
              {response !== null && "Enter name min length of 4"}
            </p>
            <p style={{ color: "red" }}>
              {response !== null && "Enter password min length of 6"}
            </p>
            <Button variant="contained" size="large" onClick={postData}>
              SignUp
            </Button>
            <Link style={{ marginBottom: "15px" }} to="/login">
              Already have account? click here to Login
            </Link>
          </div>
        </Box>
      </div>
    </div>
  );
}
