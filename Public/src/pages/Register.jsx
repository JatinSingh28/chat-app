import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";
import Spline from "@splinetool/react-spline";

export default function Register() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { password, username, email } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg);
      } else {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    const username1 = username.toLowerCase();
    if (password != confirmPassword) {
      toast.error("Confirm Password doesn't match.", {
        draggable: true,
        newestOnTop: true,
      });
      return false;
    } else if (username1.length < 4) {
      toast.error("Username should have atleast 4 characters");
      return false;
    } else if (password.length < 5) {
      toast.error("Password should have atleast 5 characters");
      return false;
    } else if (email == "") {
      toast.error("Email is required");
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
        <div className="spline">
          <Spline scene="https://prod.spline.design/bJQBHWF7ang-6nFh/scene.splinecode" />
        </div>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src="" alt="" /> */}
            <h1>Register</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit" onClick={handleSubmit}>
            Create User
          </button>
          <span>
            Already have an account? <Link to="/login">Login</Link>{" "}
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .spline {
    position: absolute;
    height: 100vh;
    width: 100vw;
  }
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
    background-color: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(7px);
    border-radius: 15px;
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
        border: 0.2rem solid #00b3ffd6;
        outline: none;
      }
      &::placeholder {
        color: white;
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
        color: #0011ff;
        margin-left: 0.5rem;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
