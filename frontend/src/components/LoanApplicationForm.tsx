import { useEffect, useState } from "react";
import SelectAccountingSoftware from "./SelectAccountingSoftware";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

function LoanApplicationForm() {
    const [appId, setAppId] = useState("");
    useEffect(() => {
        setAppId(getAppId());
    }, []);
    function getAppId() {
        return "12345"
    }
    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        console.log("Form submitted");
        return;
    }
    return (
        <Card className="w-[550px]">
            <CardHeader>
                <CardTitle>Create New Loan Application</CardTitle>
                <CardDescription>Fill in the Form. Select Accounting Software and Fetch Your Balances. Get A Loan Decision</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Label>Application Id: {appId}</Label>
                    <Separator />
                    <h3 className="bold">Business Details</h3>
                    <Separator />
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input type="text" name="businessName" />
                    <Separator />
                    <Label htmlFor="yearEstablished">Year Established</Label>
                    <Input type="text" name="yearEstablished" />
                    <Separator />
                    <Label htmlFor="loanAmount">Requested Loan Amount</Label>
                    <Input type="text" name="loanAmount" />
                    <Separator />
                    <Label htmlFor="selectAcc">Accounting Software</Label>
                    <SelectAccountingSoftware />
                    <br />
                    <Button type="submit">Request Loan Decision</Button>
                </form>
            </CardContent>
        </Card>
    )

}

export default LoanApplicationForm