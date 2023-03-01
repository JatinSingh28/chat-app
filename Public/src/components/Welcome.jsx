import React from "react";
import styled from "styled-components";
import hello from "../assets/hello-gif-14.gif";
export default function Welcome({ currentUser }) {
  return (
    <Container>
      <img src={hello} alt="Robot" />
      <h1>
        Welcome, <span>{currentUser.username}</span>
      </h1>
      <h3>Select a chat to start messaging</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  gap: 1rem;

  img {
    height: 20rem;
  }
  span {
    color: #865dff;
  }
`;
