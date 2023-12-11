import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

function SelectAccountingSoftware() {
    async function fetchBalance(e:any){
        e.preventDefault();
        console.log("Fetching account balances for:")
    }
    return (
        <>
            <div>
            <Select name="provider">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Accounting Software" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="xero">Xero</SelectItem>
                    <SelectItem value="myob">MYOB</SelectItem>
                </SelectContent>
            </Select>
            <Button onClick={fetchBalance}>Fetch Balances</Button>
            </div>
        </>
    )
}

export default SelectAccountingSoftware;