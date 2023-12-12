import { useEffect, useState } from "react";
import SelectAccountingSoftware from "./SelectAccountingSoftware";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";

function LoanApplicationForm() {
    const [formData, setFormData] = useState({
        id: "",
        name: '',
        yearEstablished: 2023,
        loanAmountRequested: 0.00,
        balances: [],
        preAssessment: 20

    })
    const [decision, setDecision] = useState("");
    useEffect(() => {
        getAppId().then(id => {
            console.log("Id: " + id);
            setFormData(prevState => ({
                ...prevState,
                id: id
            }))
        });
    }, []);
    async function getAppId() {
        const requestOptions: RequestInit = {
            method: 'POST',
            redirect: 'follow',
            mode: 'cors'
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:8082"}/initialise`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            return json.application_id;
        } catch (error) {
            console.log('error', error);
            return undefined;  // Return undefined or some default value in case of an error
        }
    }
    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        console.log("Form submitted");
        console.log(JSON.stringify(formData));
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(formData);
        const requestOptions: RequestInit = {
            method: 'POST',
            redirect: 'follow',
            mode: 'cors',
            headers: myHeaders,
            body: raw
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:8082"}/outcome`, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const json = await response.json();
            console.log(`Return result: ${JSON.stringify(json)}`);
            setDecision(json.outcome.outcome)
        } catch (error) {
            console.log('error', error);
            return undefined;  // Return undefined or some default value in case of an error
        }
        return;
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleBalancesRetrieved = (balances: []) => {
        setFormData(prevState => ({
            ...prevState,
            balances
        }))
    }
    return (
        <Card className="w-[550px]">
            <CardHeader>
                <CardTitle>Create New Loan Application</CardTitle>
                <CardDescription>Fill in the Form. Select Accounting Software and Fetch Your Balances. Get A Loan Decision</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Label>Application Id: {formData.id}</Label>
                    <Separator />
                    <h3 className="bold">Business Details</h3>
                    <Separator />
                    <Label htmlFor="name">Business Name</Label>
                    <Input type="text" name="name" onChange={handleInputChange} value={formData.name} />
                    <Separator />
                    <Label htmlFor="yearEstablished">Year Established</Label>
                    <Input type="text" name="yearEstablished" onChange={handleInputChange} value={formData.yearEstablished} />
                    <Separator />
                    <Label htmlFor="loanAmountRequested">Requested Loan Amount</Label>
                    <Input type="text" name="loanAmountRequested" onChange={handleInputChange} value={formData.loanAmountRequested} />
                    <Separator />
                    <Label htmlFor="selectAcc">Accounting Software</Label>
                    <SelectAccountingSoftware onBalancesRetrieved={handleBalancesRetrieved} />
                    <br />
                    <Button type="submit">Request Loan Decision</Button>

                </form>
            </CardContent>
            <CardFooter>
                {decision && <span>Decision: <Badge>{decision}</Badge></span>}
            </CardFooter>
        </Card>
    )

}

export default LoanApplicationForm