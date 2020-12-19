import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function SignUpPage() {
  const [username, setUserName] = useState({});
  const [password, setPassword] = useState({});
  const [email, setEmail] = useState({});
  const [firstname, setFirstName] = useState({});
  const [lastname, setLastName] = useState({});
  const history = useHistory();

  const handleUsername = (event) => {
    setUserName(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleFirstname = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastname = (event) => {
    setLastName(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:4001/signup", { email, username,firstname,lastname,password })
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
        Welcome to SIGN UP page, please enter your information

      <form onSubmit={handleSubmit}>
        <div className="signUp">
        <div className="email">
          <label for="email">Enter Email: </label>
          <input type="email" onChange={handleEmail} />
        </div>
        <div className="user">
          <label for="username">Enter Username: </label>
          <input type="text" onChange={handleUsername} />
        </div>
        <div className="firstname">
          <label for="firstname">Enter First Name: </label>
          <input type="text" onChange={handleFirstname} />
        </div>
        <div className="lastname">
          <label for="lastname">Enter Last Name: </label>
          <input type="text" onChange={handleLastname} />
        </div>
        <div className="pass">
          <label for="password">Enter Password: </label>
          <input type="password" onChange={handlePassword} />
        </div>
        <div className="login">
          <input type="submit" value="Sign up" />
        </div>
        </div>
      </form>
    </div>
  );
}

export default SignUpPage;
