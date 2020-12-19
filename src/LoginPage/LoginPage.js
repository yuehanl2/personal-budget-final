import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    await axios
      .post("http://localhost:4001/login", { email,username,password })
      .then((res) => {
        if (res) {
          const token = res.data.token;
          localStorage.setItem("jwt", token);
          localStorage.setItem("userId", res.data.userID);
          console.log(localStorage.getItem("userId"));
          history.push("/MyBudget");
        }
      });
  };

  return (
    <div>

       Welcome to LOGIN page, please enter your information

      <form onSubmit={handleSubmit}>
        <div className="login">
          <div>
          <label for="email">Enter Email: </label>
          <input type="email" name="email" id="email" />
        </div>
        <div>
          <label for="username">Enter User Name: </label>
          <input type="username" name="username" id="username" />
        </div>
        <div>
          <label for="password">Enter Password: </label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <input type="submit" value="Login" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
