function SelectAccountingSoftware() {
    return (
        <>
            <select name="provider">
                <option value="xero">Xero</option>
                <option value="myob">MYOB</option>
            </select>
            <button>Fetch Balances</button>
        </>
    )
}

export default SelectAccountingSoftware;