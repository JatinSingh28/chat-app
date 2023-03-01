import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contacts from "../components/Contacts";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import Logout from "../components/Logout";
import { io } from "socket.io-client";
import { RiContactsFill } from "react-icons/ri";

export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [width, updateWidth] = useState(false);
  const socket = useRef();
  useEffect(() => {
    async function setUser() {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        setIsLoaded(true);
      }
    }
    setUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function func() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          // console.log(currentUser._id);
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          // console.log('data',data);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }
    func();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  useEffect(() => {
    if (window.innerWidth < 720) updateWidth(true);
    else updateWidth(false);
  }, [window.innerWidth]);

  return (
    <>
      <Container>
        <div className="container">
          {/* <ContactSidebar/> */}
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {/* {width && <RiContactsFill />} */}
          {isLoaded &&
            (currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            ))}
        </div>
        <Logout />
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #865dff;
  @media screen and (max-width: 720px) {
    justify-content: left;
    width: 100%;
  }

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (max-width: 720px) {
      grid-template-columns: 28% 95%;
    }
  }
`;
