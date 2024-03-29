import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"

import UserContext from "./../contexts/UserContext"
import Gif from "../assets/images/Eclipse.gif"

export default function MainPage() {
  const { user } = useContext(UserContext)
  const [history, setHistory] = useState([]) // history of transactions
  const [refresh, setRefresh] = useState(false) // refresh history after a promisse
  const [loading, setLoading] = useState(true) // loading request
  const navigate = useNavigate()

  const config = { Authorization: `Bearer ${user.token}` } // authorization token

  // get transaction history
  useEffect(() => {
    const URI = "https://projeto13.herokuapp.com/bank"
    const promisse = axios.get(URI, { headers: config })
    promisse.then((response) => {
      setHistory(response.data)
      setLoading(false)
    })
    promisse.catch((e) => console.log(e.response))
  }, [refresh])

  // return to Sign In page
  function returnSignIn() {
    const confirm = window.confirm("Do you want to sign out?")
    if (confirm) {
      localStorage.removeItem("project13user")
      navigate("/")
    }
  }

  return (
    <Main>
      <Top>
        <h1>Hello, {user.name}</h1>
        <ion-icon name="exit-outline" onClick={returnSignIn}></ion-icon>
      </Top>
      <History style={history.length === 0 ? { justifyContent: "center", alignItems: "center" } : {}}>
        {loading ? ( // check if the request is loading
          <img src={Gif} alt="Loading animation" />
        ) : history.length === 0 ? ( // check if there are any transactions
          <p className="null">There isn't any entry or payment in your history</p>
        ) : (
          <BankHistory
            history={history}
            refresh={refresh}
            setRefresh={setRefresh}
            setLoading={setLoading}
            config={config}
            navigate={navigate}
          />
        )}
      </History>
      <Wrapper>
        <article onClick={() => navigate("/entry")}>
          <ion-icon name="add-circle-outline"></ion-icon>
          <p>New Entry</p>
        </article>
        <article onClick={() => navigate("/payment")}>
          <ion-icon name="remove-circle-outline"></ion-icon>
          <p>New Payment</p>
        </article>
      </Wrapper>
    </Main>
  )
}

// section of transactions
function BankHistory({ history, setRefresh, setLoading, refresh, config, navigate }) {
  // delete a transaction
  function deleteTransaction(id, description) {
    const proceed = window.confirm(`Do you want to delete the transaction [ ${description} ]?`)
    if (proceed) {
      setLoading(true)
      const URI = `https://projeto13.herokuapp.com/bank/${id}`
      const promisse = axios.delete(URI, { headers: config })
      promisse.then((response) => {
        setRefresh(!refresh)
      })
      promisse.catch((e) => {
        alert("Error")
      })
    }
  }

  // edit a transaction
  function editTransaction(id, value, description, type) {
    navigate("/edit", { state: { id, value, description, type } })
  }

  // get account balance and reverse history array
  let total = 0 // account balance
  let negative = false // check if balance is negative or not
  // get balance
  history.forEach((h) => {
    if (h.type === "entry") {
      total += parseFloat(h.value)
    } else {
      total -= parseFloat(h.value)
    }
  })
  if (total < 0) {
    negative = true
  }
  total = Math.abs(total).toFixed(2)
  history.reverse() // show newer transactions first

  return (
    <>
      <div className="history">
        {history.map(({ _id, date, description, value, type }) => {
          return (
            <p key={`${description} - ${value}`}>
              <time>{date}</time>
              <span onClick={() => editTransaction(_id, value, description, type)}>{description}</span>
              <var style={type === "payment" ? { color: "var(--red)" } : { color: "var(--green)" }}>
                {value}
              </var>
              <ion-icon name="close-outline" onClick={() => deleteTransaction(_id, description)}></ion-icon>
            </p>
          )
        })}
      </div>
      <div className="balance">
        <h4>BALANCE</h4>
        <var style={negative ? { color: "var(--red)" } : { color: "var(--green)" }}>{total}</var>
      </div>
    </>
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
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 90%;
  margin: 25px 0 15px;

  font-size: 26px;
  font-weight: 700;
  color: #ffffff;

  h1 {
    height: 26px;
    margin-right: 30px;
    overflow: hidden;
  }

  ion-icon {
    font-size: 34px;
    min-width: 34px;
    cursor: pointer;
  }
`

const History = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 90%;
  height: 67%;
  padding: 23px 12px;
  margin-bottom: 15px;

  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);

  img {
    width: 200px;
    margin: auto;
  }

  .history {
    max-height: 95%;
    overflow: auto;
  }

  p {
    display: flex;
    align-items: center;

    position: relative;
    font-size: 16px;
    margin-bottom: 25px;

    time {
      color: #c6c6c6;
      margin-right: 10px;
    }

    span {
      display: block;
      max-width: 48%;
      height: 16px;

      overflow: hidden;
      cursor: pointer;
    }

    var {
      position: absolute;
      right: 26px;
    }

    ion-icon {
      position: absolute;
      right: 0;

      font-size: 20px;
      color: #c6c6c6;
      cursor: pointer;
    }
  }

  .balance {
    position: absolute;
    bottom: 10px;
    width: calc(100% - 24px); // 100% - padding: ;

    display: flex;
    justify-content: space-between;

    font-size: 20px;

    h4 {
      font-weight: 700;
    }
  }

  .null {
    margin: 0;
    font-size: 20px;
    color: #868686;
    text-align: center;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 90%;
  height: 17%;
  margin-bottom: 10px;

  article {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    height: 100%;
    width: 47%;
    max-width: 170px;
    padding: 10px;
    overflow: hidden;

    border-radius: 5px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    background-color: #a328d6;

    color: #ffffff;
    cursor: pointer;

    ion-icon {
      font-size: 30px;
    }

    p {
      font-size: 17px;
      font-weight: 700;
      width: 55%;
    }
  }
`
