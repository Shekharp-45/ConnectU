import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";

export default function Register() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/");
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>ConnectU</h1>
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
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login.</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}


const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(135deg, #2d2a4a, #473c63, #362f52); /* Enhanced gradient background */
  
  .brand {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Adjusted gap for smaller screens */
    justify-content: center;
    
    img {
      height: 4rem; /* Adjusted height for smaller screens */
    }
    
    h1 {
      color: #e0d6f6; /* Lighter text for contrast */
      text-transform: uppercase;
      font-size: 1.5rem; /* Adjusted font size for smaller screens */
    }
  }

  form {
    width: 90%; /* Adjusted width for better fit on smaller screens */
    max-width: 400px; /* Max width to prevent form from stretching too wide */
    display: flex;
    flex-direction: column;
    gap: 1.5rem; /* Adjusted gap between elements */
    background-color: #342e4e; /* Darker purple background */
    border-radius: 2rem;
    padding: 2rem; /* Adjusted padding for better spacing */
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15); /* Shadow effect */
  }
  
  input {
    background-color: #241e39; /* Darker input background */
    padding: 1rem;
    border: 0.1rem solid #63557d; /* Lighter border */
    border-radius: 0.4rem;
    color: #e0d6f6; /* Lighter text */
    width: 100%;
    font-size: 1rem;
    
    &:focus {
      border: 0.1rem solid #121ab5; /* Lighter border on focus */
      outline: none;
    }
  }
  
  button {
    background-color: #63557d; /* Darker button */
    color: #e0d6f6; /* Lighter text */
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    
    &:hover {
      background-color: #8c78a4; /* Lighter on hover */
    }
  }
  
  span {
    color: #e0d6f6; /* Lighter text */
    text-transform: uppercase;
    font-size: 0.9rem; /* Adjusted font size for smaller screens */
    
    a {
      color: #63557d; /* Darker link */
      text-decoration: none;
      font-weight: bold;
    }
  }

  @media screen and (max-width: 400px) {
    .brand {
      img {
        height: 3rem; /* Further reduced height for smaller screens */
      }
      
      h1 {
        font-size: 1.2rem; /* Further reduced font size for smaller screens */
      }
    }

    form {
      padding: 1.5rem; /* Adjusted padding for smaller screens */
    }

    input {
      font-size: 0.9rem; /* Further reduced font size for smaller screens */
    }

    button {
      padding: 0.8rem 1.5rem; /* Adjusted padding for smaller screens */
      font-size: 0.9rem; /* Further reduced font size for smaller screens */
    }

    span {
      font-size: 0.8rem; /* Further reduced font size for smaller screens */
    }
  }
`;

