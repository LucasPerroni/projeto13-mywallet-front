import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import SignIn from "./SignIn"
import SignUp from "./SignUp"
import MainPage from "./MainPage"
import Entry from "./Entry"
import Payment from "./Payment"

import UserContext from "../contexts/UserContext"

export default function App() {
  // Get 'user' obj from localStorage
  const savedUserString = localStorage.getItem("project13user")
  let savedUser = JSON.parse(savedUserString)
  if (savedUser === null) {
    savedUser = {}
  }

  const [user, setUser] = useState(savedUser)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/entry" element={<Entry />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="*" element={<p>This page does not exist!</p>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}
