import { useContext, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

import UserContext from "../contexts/UserContext"

export default function Edit() {
  const navigate = useNavigate()
  const { state } = useLocation() // get params
  const [valid, setValid] = useState(true) // validate if axios post was a success
  const { user } = useContext(UserContext)

  const config = { Authorization: `Bearer ${user.token}` }

  // send request to API
  function submitForm(e, id) {
    e.preventDefault()

    const URI = `http://localhost:5000/bank/${id}`
    const promisse = axios.put(
      URI,
      {
        value: e.target[0].value,
        description: e.target[1].value,
      },
      { headers: config }
    )
    promisse.then((response) => navigate("/main"))
    promisse.catch((e) => setValid(false))
  }

  const examples = "Ex: 5.00 / 19.99 / 149.90" // examples of inputs in "value"
  return (
    <Main>
      <div>
        <h1>Edit {state.type === "entry" ? "entry" : "payment"}</h1>
        <ion-icon name="arrow-back-outline" onClick={() => navigate("/main")}></ion-icon>
      </div>
      <form onSubmit={(e) => submitForm(e, state.id)}>
        <input
          type="text"
          placeholder="Value"
          pattern="[1-9][0-9]*\.[0-9]{2}"
          title={examples}
          defaultValue={state.value}
          required
        />
        <input type="text" placeholder="Description" defaultValue={state.description} required />
        <button type="submit">Update {state.type === "entry" ? "entry" : "payment"}</button>
      </form>
      {valid ? <></> : <p>Failed to edit {state.type === "entry" ? "entry" : "payment"}...</p>}
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

  div {
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