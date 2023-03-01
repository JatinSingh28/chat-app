import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiPowerOff } from "react-icons/bi";

export default function Logout() {
  const navigate = useNavigate();
  const handleClick = async () => {
    localStorage.removeItem("chat-app-user");
    navigate("/login");
  };
  return (
    <Button onClick={handleClick}>
      <BiPowerOff />
    </Button>
  );
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #191825;
  border: none;
  position: absolute;
  top: 20px;
  right: 25px;
  transition:  0.3s ease-in-out;
  cursor: pointer;
  svg {
    font-size: 1.4rem;
    color: #ebe7ff;
    max-height: 1.6rem;
    max-width: 1.6rem;
  }
  &:hover{
    background-color: #9a86f3;
  }
`;
