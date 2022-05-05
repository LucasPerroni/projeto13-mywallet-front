import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"

import UserContext from "../contexts/UserContext"

export default function SignIn() {
  const navigate = useNavigate()
  const [valid, setValid] = useState(true) // check if input data is valid
  const { setUser } = useContext(UserContext)

  function submitForm(e) {
    e.preventDefault()
    const URI = "http://localhost:5000/signin"

    const promisse = axios.post(URI, {
      email: e.target[0].value,
      password: e.target[1].value,
    })
    promisse.then((response) => {
      setUser(response.data)

      const userString = JSON.stringify(response.data)
      localStorage.setItem("project13user", userString)

      navigate("/main")
    })
    promisse.catch((e) => {
      setValid(false)
    })
  }

  return (
    <Main>
      <h1>MyWallet</h1>
      <form onSubmit={(e) => submitForm(e)}>
        <input type="email" placeholder="E-mail" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Enter</button>
      </form>
      <StyledLink to={"/sign-up"}>First time? Sign-up!</StyledLink>
      {valid ? <></> : <p>Failed to Sign-in...</p>}
    </Main>
  )
}

// STYLED COMPONENTS
const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: absolute;
  width: 100%;
  height: 100%;

  overflow-y: auto;

  form {
    width: 90%;
  }

  h1 {
    font-family: "Saira Stencil One", cursive;
    margin: 170px 0 24px;

    font-size: 32px;
    color: #ffffff;
  }

  input {
    width: 100%;
    height: 58px;

    margin-bottom: 13px;
    border-radius: 5px;
    border: none;
    outline: none;

    font-size: 20px;
    padding: 0 15px;
  }

  button {
    width: 100%;
    height: 46px;

    margin-bottom: 36px;
    border: none;
    border-radius: 5px;
    background-color: #a328d6;

    font-size: 20px;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
  }

  p {
    margin-top: 24px;
    font-size: 20px;
    font-weight: 700;
    color: var(--error);
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
`
