import { useEffect, useState } from "react";
import SelectAccountingSoftware from "./SelectAccountingSoftware";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";

function LoanApplicationForm() {
    const [formData, setFormData] = useState({
        id: "",
        name: '',
        yearEstablished:2023,
        loanAmount:0.00,
        balances:[],
        preAssessment:20

    })
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
        console.log(formData);
        return;
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleBalancesRetrieved = (balances:[]) => {
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
                    <Label htmlFor="loanAmount">Requested Loan Amount</Label>
                    <Input type="text" name="loanAmount" onChange={handleInputChange} value={formData.loanAmount} />
                    <Separator />
                    <Label htmlFor="selectAcc">Accounting Software</Label>
                    <SelectAccountingSoftware onBalancesRetrieved={handleBalancesRetrieved}/>
                    <br />
                    <Button type="submit">Request Loan Decision</Button>

                </form>
            </CardContent>
        </Card>
    )

}

export default LoanApplicationForm