import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

import SignIn from "./SignIn"
import SignUp from "./SignUp"
import MainPage from "./MainPage"
import Entry from "./Entry"
import Payment from "./Payment"

import UserContext from "../contexts/UserContext"

export default function App() {
  const [user, setUser] = useState({})

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
