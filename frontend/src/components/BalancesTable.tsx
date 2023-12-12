import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type BalancesData = {
    year: number;
    month: number;
    profitOrLoss: number;
    assetsValue: number;
};

type BalancesTableProps = {
    data: BalancesData[];
};

const BalancesTable: React.FC<BalancesTableProps> = ({ data }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Year</TableHead>
                    <TableHead>Month</TableHead>
                    <TableHead>Profit</TableHead>
                    <TableHead className="text-right">Assets Value</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((balance, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium">{balance.year}</TableCell>
                        <TableCell>{balance.month}</TableCell>
                        <TableCell>{balance.profitOrLoss}</TableCell>
                        <TableCell className="text-right">{balance.assetsValue}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default BalancesTable;