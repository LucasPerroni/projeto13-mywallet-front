import { BrowserRouter, Routes, Route } from "react-router-dom"

import SignIn from "./SignIn"
import SignUp from "./SignUp"
import MainPage from "./MainPage"
import Entry from "./Entry"
import Payment from "./Payment"

export default function App() {
  return (
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
  )
}
