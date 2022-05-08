import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"
import axios from "axios"
import styled from "styled-components"

export default function SignIn() {
  const navigate = useNavigate()
  const [valid, setValid] = useState(true) // check if input data is valid
  const [show, setShow] = useState(false) // show password or not
  const [loading, setLoading] = useState(false) // loading API request
  // list of all inputs
  const inputs = [
    { type: "text", placeholder: "Name" },
    { type: "email", placeholder: "E-mail" },
    { type: "password", placeholder: "Password (6+ characters)" },
    { type: "password", placeholder: "Confirm Password (6+ characters)" },
  ]

  function submitForm(e) {
    e.preventDefault()
    setLoading(true)
    const URI = "https://projeto13.herokuapp.com/signup"

    if (e.target[2].value !== e.target[3].value) {
      setValid(false)
      return
    }

    const promisse = axios.post(URI, {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[3].value,
    })
    promisse.then((response) => {
      navigate("/")
    })
    promisse.catch((e) => {
      setValid(false)
      setLoading(false)
    })
  }

  function showPassword(e) {
    if (e.target.checked) {
      setShow(true)
    } else {
      setShow(false)
    }
  }

  return (
    <Main>
      <h1>MyWallet</h1>
      <form onSubmit={(e) => submitForm(e)}>
        {inputs.map((i) => {
          return (
            <input
              key={i.placeholder}
              type={i.type === "password" && show ? "text" : i.type}
              placeholder={i.placeholder}
              minLength={i.type === "password" ? "6" : ""}
              required
            />
          )
        })}
        <div>
          <input type="checkbox" id="show" className="checkbox" onClick={(e) => showPassword(e)} />
          <label htmlFor="show">Show password</label>
        </div>
        <button
          type="submit"
          style={loading ? { opacity: 0.6, cursor: "auto" } : {}}
          disabled={loading ? true : false}
        >
          {loading ? <ThreeDots color="#ffffff" height={46} /> : "Enter"}
        </button>
      </form>
      <StyledLink to={"/"}>Alreary have an account? Sign-in!</StyledLink>
      {valid ? <></> : <p>Failed to create account...</p>}
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
    margin: 100px 0 24px;

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
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 46px;

    margin: 13px 0 36px;
    border: none;
    border-radius: 5px;
    background-color: #a328d6;

    font-size: 20px;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
  }

  p {
    margin-bottom: 25px;
    font-size: 20px;
    font-weight: 700;
    color: var(--error);
  }

  div {
    display: flex;
    align-items: center;
    height: 25px;
  }

  .checkbox {
    margin: 0 10px;
    width: 25px;
    cursor: pointer;
  }

  label {
    font-size: 15px;
    font-weight: 700;
    color: #ffffff;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 25px;
`
