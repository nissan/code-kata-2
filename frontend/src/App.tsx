import { useState } from 'react'
import LoanApplicationForm from './components/LoanApplicationForm';

function App() {
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
