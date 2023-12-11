import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [provider, setProvider] = useState("xero")

  return (
    <>
      <h1>Loan Application Form</h1>
      <form>
        <h2>Business Details</h2>
        <label>Business Name</label>
        <input type="text" name="businessName" />
        <br />
        <label>Year Established</label>
        <input type="text" name="yearEstablished" />
        <br />
        <label>Requested Loan Amount</label>
        <input type="text" name="loanAmount" />
        <br />
        <label>Accounting Software</label>
        <select name="provider">
          <option value="xero">Xero</option>
          <option value="myob">MYOB</option>
        </select>
        <button onClick={fetchBalances}>Fetch Balances</button>
        <br />
        <button>Request Loan Decision</button>
      </form>
    </>
  )
}

export default App
