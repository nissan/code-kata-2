import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoanApplicationForm from './components/LoanApplicationForm';

function App() {
  const [count, setCount] = useState(0);
  const [provider, setProvider] = useState("");
  const [newAppStarted, setNewAppStarted] = useState(false);
  
  return (
    <>
      <h1>Loan Application Form</h1>
      <button onClick={()=>setNewAppStarted(true)}>Start New Application</button>
      {newAppStarted && <LoanApplicationForm />}
    </>
  )
}

export default App
