import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        if (data) {
          setCurrentUserName(data.username);
          setCurrentUserImage(data.avatarImage);
        }
      } catch (error) {
        console.error("Error fetching data from localStorage:", error);
      }
    };

    fetchData();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>ConnectU</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                key={contact._id}
                className={`contact ${index === currentSelected ? "selected" : ""}`}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
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
  background-color: transparent;

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    padding: 0.5rem;
    background-color: transparent; /* Sky blue as the main color */

    img {
      height: 2rem;
    }

    h3 {
      color: white;
      text-transform: uppercase;
      font-size: 0.8rem; /* Adjust font size for smaller screens */
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.6rem;
    padding: 0.5rem;

    &::-webkit-scrollbar {
      width: 0.2rem;

      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff34;
      min-height: 4rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 0.6rem;
      align-items: center;
      transition: 0.5s ease-in-out;

      .avatar {
        img {
          height: 2.5rem;
          border-radius: 50%; /* Optional: Rounded avatar */
        }
      }

      .username {
        h3 {
          color: white;
          font-size: 0.9rem; /* Adjust font size for smaller screens */
        }
      }
    }

    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #161a30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;

    .avatar {
      img {
        height: 3rem;
        max-width: 100%;
        border-radius: 50%; /* Optional: Rounded avatar */
      }
    }

    .username {
      h2 {
        color: white;
        font-size: 1rem; /* Adjust font size for smaller screens */
      }
    }
  }

  @media screen and (min-width: 320px) and (max-width: 720px) {
    .brand {
      gap: 0.5rem;
      padding: 0.1rem;
    }

    .contacts {
      gap: 0.5rem;
      padding: 0.3rem;
      
      .contact {
        min-height: 3.5rem;

        .avatar {
          img {
            height: 2.2rem;
          }
        }

        .username {
          h3 {
            font-size: 0.8rem;
          }
        }
      }
    }

    .current-user {
      gap: 0.8rem;
      padding: 0.4rem;

      .avatar {
        img {
          height: 2.5rem;
        }
      }

      .username {
        h2 {
          font-size: 0.8rem;
        }
      }
    }
  }
`;





