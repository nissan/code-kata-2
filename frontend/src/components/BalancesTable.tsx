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
        <table>
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Month</th>
                    <th>Profit/Loss</th>
                    <th>Assets Value</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.year}</td>
                        <td>{item.month}</td>
                        <td>{item.profitOrLoss}</td>
                        <td>{item.assetsValue}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BalancesTable;