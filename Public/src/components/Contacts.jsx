import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../assets/Spin-1s-200px.svg";

export default function Contacts({ contacts, currentUser,changeChat }) {
  //   alert(5);
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            {/* <img src={logo} alt="" /> */}
            <h3>We Chat</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    changeCurrentChat(index,contact);
                  }}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar image"
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar image"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    h3 {
      color: white;
      text-transform: uppercase;
    }
    img {
      height: 2rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    overflow: auto;
    gap: 0.5rem;

    &::-webkit-scrollbar{
        width:0.2rem;
        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }

    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      display: flex;
      align-items: center;
      border-radius: 1rem;
      border: 1px solid purple;
      padding: 0.4rem;
      gap: 1rem;
      transition: 0.3s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
          /* font-size: 2rem; */
          text-transform: capitalize;
        }
      }
    }
    .selected {
      background-color: #9186f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    .avatar {
      img {
        height: 3.5rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
        /* font-size: 2rem; */
        text-transform: capitalize;
      }
    }
    @media screen and(min-width:720px)and (max-width:1080px) {
        .username{
            h2{
                font-size: 1rem;
            }
        }
    }
  }
`;
