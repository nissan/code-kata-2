function LoanApplicationForm() {
    async function handleSubmit(e:React.SyntheticEvent){
        e.preventDefault();
        console.log("Form submitted");
        return;
      }
    return (
        <form onSubmit={handleSubmit}>
            <h2>Application Id: {`12345`}</h2>
            <h3>Business Details</h3>
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
            <button>Fetch Balances</button>
            <br />
            <button type="submit">Request Loan Decision</button>
        </form>
    )

}

export default LoanApplicationForm