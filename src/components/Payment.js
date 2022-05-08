import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"
import styled from "styled-components"
import axios from "axios"

import UserContext from "../contexts/UserContext"

export default function Payment() {
  const navigate = useNavigate()
  const [valid, setValid] = useState(true) // validate if axios post was a success
  const [loading, setLoading] = useState(false) // loading API request
  const { user } = useContext(UserContext)

  const config = { Authorization: `Bearer ${user.token}` }

  function submitForm(e) {
    e.preventDefault()
    setLoading(true)

    const URI = "https://projeto13.herokuapp.com/bank"
    const promisse = axios.post(
      URI,
      {
        type: "payment",
        value: e.target[0].value,
        description: e.target[1].value,
      },
      { headers: config }
    )
    promisse.then((response) => navigate("/main"))
    promisse.catch((e) => {
      setValid(false)
      setLoading(false)
    })
  }

  const examples = "Ex: 5.00 / 19.99 / 149.90" // examples of inputs in "value"
  return (
    <Main>
      <header>
        <h1>New Payment</h1>
        <ion-icon name="arrow-back-outline" onClick={() => navigate("/main")}></ion-icon>
      </header>
      <form onSubmit={(e) => submitForm(e)}>
        <input type="text" placeholder="Value" pattern="[1-9][0-9]*\.[0-9]{2}" title={examples} required />
        <input type="text" placeholder="Description" required />
        <button
          type="submit"
          style={loading ? { opacity: 0.6, cursor: "auto" } : {}}
          disabled={loading ? true : false}
        >
          {loading ? <ThreeDots color="#ffffff" height={46} /> : "Submit"}
        </button>
      </form>
      {valid ? <></> : <p>Failed to create a new payment...</p>}
    </Main>
  )
}

// STYLED COMPONENTS
const Main = styled.main`
  display: flex;
  flex-direction: column;

  position: absolute;
  width: 100%;
  height: 100%;

  overflow-y: auto;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 90%;
    margin: 25px auto 40px;

    font-size: 26px;
    font-weight: 700;
    color: #ffffff;

    ion-icon {
      font-size: 34px;
      cursor: pointer;
    }
  }

  form {
    width: 90%;
    margin: 0 auto;
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

    border: none;
    border-radius: 5px;
    background-color: #a328d6;

    font-size: 20px;
    color: #ffffff;
    font-weight: 700;
    cursor: pointer;
  }

  p {
    margin: 24px auto 0;

    font-size: 20px;
    font-weight: 700;
    color: var(--error);
  }
`
