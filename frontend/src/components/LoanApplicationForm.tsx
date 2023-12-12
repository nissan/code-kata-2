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
        getAppId().then(appId => {
            setAppId(appId);
        });
    }, []);
    async function getAppId() {
        var requestOptions: RequestInit = {
            method: 'POST',
            redirect: 'follow',
            mode: 'cors'
        };

        try {
            const response = await fetch("http://localhost:8082/initialise", requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            return json.application_id;  // Assuming the field is named 'application_id'
        } catch (error) {
            console.log('error', error);
            return undefined;  // Return undefined or some default value in case of an error
        }
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