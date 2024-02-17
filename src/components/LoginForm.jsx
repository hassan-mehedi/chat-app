import React from "react";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (submittedValue) => {
    submittedValue.preventDefault();

    const authenticationObject = {
      "Project-ID": "7e0171d5-f8fc-4327-8525-ac3b65173e32",
      "User-Name": username,
      "User-Secret": password,
    };

    try {
      await axios.get("https://api.chatengine.io/chats", {
        headers: authenticationObject,
      });
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
    } catch (error) {
      setError("Wrong username or password, try again...");
    }
  };
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat App</h1>
        <form onSubmit={submitHandler}>
          <input
            className="input"
            type="text"
            value={username}
            onChange={(item) => setUsername(item.target.value)}
            placeholder="username"
            required
          />
          <input
            className="input"
            type="text"
            value={password}
            onChange={(item) => setPassword(item.target.value)}
            placeholder="password"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span>Login</span>
            </button>
          </div>
          <h3 className="error">{error}</h3>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
