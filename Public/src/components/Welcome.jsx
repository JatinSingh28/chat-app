import React from 'react'
import styled from 'styled-components'
import robot from "../assets/robot.gif"
export default function Welcome({currentUser}) {
  return (
    <Container>
        <img src={robot} alt='Robot'/>
        <h1>
            Welcome, <span>{currentUser.username}</span>
        </h1>
        <h3>Select a chat to start messaging</h3>
    </Container>
  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    gap: 1rem;
    
    img{
        height: 25rem;
    }
    span{
        color:#4e00ff
    }

`