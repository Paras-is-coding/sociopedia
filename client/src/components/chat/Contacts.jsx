import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Contacts({ contacts, currentUser, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    setCurrentUserImage(currentUser && currentUser.picturePath || "");
    setCurrentUserName(currentUser && `${currentUser.firstname} ${currentUser.lastname}` || "");
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserName !== "" && (
        <Container>
          <div className="brand">
            <h3>Contacts</h3>
          </div>
          <div className="contacts">
            {contacts &&
              contacts.map((contact, index) => (
                <div
                  className={`contact ${index === currentSelected ? "selected" : ""}`}
                  key={index}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img src={`${contact && contact.picturePath}`} alt="User" />
                  </div>
                  <div className="username flex flex-wrap">
                    <h3>{`${contact.firstname} ${contact.lastname}`}</h3>
                  </div>
                </div>
              ))}
          </div>
          <div className="separator"></div>
          <div className="current-user">
            <div className="avatar">
              <img src={`${currentUserImage}`}  alt="User" />
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
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  background-color: rgb(249 250 251);
  color: white;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    h3 {
      color: rgb(17 24 39);
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: gray;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: rgb(243 244 246);
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      flex-wrap:wrap;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 2rem;
          width:2rem;
          border-radius:50%;
        }
      }
      .username {
        h3 {
          color: rgb(17 24 39);
        }
      }
    }
    .selected {
      background-color: rgb(203 213 225);
    }
  }

  .separator {
    height: 1px;
    background-color: rgb(17 24 39);
    margin: 0 1rem;
  }

  .current-user {
    display:flex;
    justify-content: center;
    align-items: center;
    gap: .5rem;
    flex-wrap:wrap;
    padding: 1rem 0;
    .avatar {
      img {
        height: 2rem;
          width:2rem;
          border-radius:50%;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: rgb(17 24 39);
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
    @media screen and (max-width: 720px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
