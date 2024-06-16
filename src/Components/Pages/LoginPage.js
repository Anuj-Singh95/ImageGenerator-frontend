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
import Cookies from "universal-cookie";

export default function LoginPage() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailChangeHandler = (e) => {
    // console.log(e.target.value);
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    // console.log(e.target.value);
    setPassword(e.target.value);
  };

  const postData = async () => {
    const url = `${process.env.REACT_APP_URI}/api/v1/login`; // Replace with your API endpoint
    console.log(url);
    console.log(email);
    console.log(password);
    const data = {
      email,
      password,
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

      const cookies = new Cookies(null, { path: "/" });
      cookies.set("token", result.token);
      console.log("saved token is : " + cookies.get("token"));

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
      <div className="login-container">
        <h3>Enter Login Details</h3>
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
              {response !== null && response.message}
            </p>
            <Button variant="contained" size="large" onClick={postData}>
              Login
            </Button>
            <Link to="/signup">Don't have account click here to SignUp</Link>
          </div>
        </Box>
      </div>
    </div>
  );
}
