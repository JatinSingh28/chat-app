import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    username: "",
    password: "",
  });

  useEffect(()=>{
    if(localStorage.getItem('chat-app-user')){
      navigate("/chat")
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username } = values;
      const { data } = await axios.post(loginRoute, { 
        username,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg);
      } else {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/chat");
      }
    }
  };

  const handleValidation = () => {
    const { password,  username } = values;
    if (username.length === "") {
      toast.error("Username is required");
      return false;
    } else if (password.length === "") {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setvalues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src="" alt="" /> */}
            <h1>Login</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="4"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
            min="5"
          />
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>{" "}
          </span>
        </form>
        <ToastContainer />
      </FormContainer>
    </div>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #635985;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .brand {
    h1 {
      color: white;
      text-align: center;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    background-color: #18122b;
    padding: 3rem 5rem;
    input {
      padding: 0.8rem;
      border-radius: 1rem;
      background-color: transparent;
      border: 0.1rem solid black;
      border-radius: 0.5rem;
      color: White;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #f000ff;
        outline: none;
      }
    }
    button {
      background-color: #c3acd0;
      border: 0.1rem solid #f000ff;
      padding: 0.8rem;
      border-radius: 1rem;
      margin: 1rem;
      cursor: pointer;
      font-weight: bold;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #635985;
      }
    }
    span {
      color: white;
      font-size: 1.2rem;
      a {
        color: #ebc7e6;
        margin-left: 0.5rem;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
