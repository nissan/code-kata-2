import { useState } from "react";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

function SelectAccountingSoftware() {
    const [selectedAccountingSoftware, setSelectedAccountingSoftware] = useState("");
    const [balancesFetched, setBalancesFetched] = useState(false);
    async function fetchBalance(e: any) {
        e.preventDefault();
        console.log(`Fetching account balances for:${selectedAccountingSoftware}`)
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
                    Balances for {selectedAccountingSoftware}
                </div>
                }
            </div>
        </>
    )
}

export default SelectAccountingSoftware;