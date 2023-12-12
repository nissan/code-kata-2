import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import BalancesTable from "./BalancesTable";

function SelectAccountingSoftware() {
    const [selectedAccountingSoftware, setSelectedAccountingSoftware] = useState("");
    const [balancesFetched, setBalancesFetched] = useState(false);
    const [balances, setBalances]=useState([]);
    async function fetchBalance(e: any) {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "provider_name": `"${selectedAccountingSoftware}"`
        });

        const requestOptions: RequestInit = {
            method: 'POST',
            redirect: 'follow',
            mode: 'cors',
            headers: myHeaders,
            body: raw,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:8082"}/balances`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            console.log(`Fetching account balances for:${selectedAccountingSoftware} as ${JSON.stringify(json)}`)
            setBalances(json);
        } catch (error) {
            console.log('error', error);
            return undefined;  // Return undefined or some default value in case of an error
        }
        
        setBalancesFetched(true);

    }
    const handleSelectChange = (selectedSoftware: string) => {
        setSelectedAccountingSoftware(selectedSoftware);
    };
    return (
        <>
            <div>
                <Select name="provider" onValueChange={handleSelectChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Accounting Software" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="xero">Xero</SelectItem>
                        <SelectItem value="myob">MYOB</SelectItem>
                    </SelectContent>
                </Select>
                <Button onClick={fetchBalance}>Fetch Balances</Button>
                {balancesFetched && selectedAccountingSoftware &&
                    <div id="balancesData">
                        Balances for {selectedAccountingSoftware} are 
                        <BalancesTable data={balances} />
                    </div>
                }
            </div>
        </>
    )
}

export default SelectAccountingSoftware;