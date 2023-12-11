import { useState } from 'react'
import LoanApplicationForm from './components/LoanApplicationForm';
import { Button } from './components/ui/button';

function App() {
  const [newAppStarted, setNewAppStarted] = useState(false);

  return (
    <>
      <div className='grid grid-cols-3 gap-4'>
        <div>{""}</div>
        <div>
        <h1 className="bold">Loan Application System</h1>
        <hr/>
        {!newAppStarted &&
          <Button onClick={() => setNewAppStarted(true)}>Start New Application</Button>
        }
        {newAppStarted && <LoanApplicationForm />}
      </div>
      <div>{""}</div>
      </div>
    </>
  )
}

export default App
