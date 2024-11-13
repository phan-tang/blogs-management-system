import { Table } from "react-bootstrap";

import styles from './customTable.module.scss';

export default function CustomTable({ tableData, tableName }: { tableData: any[], tableName: string }) {
    const tableHeaders = Object.keys(tableData[0]);
    return (
        <div className={styles.customTable}>
            <Table responsive='xl'>
                <thead>
                    <tr>
                        {tableHeaders.map((tableHeader, headerIndex) => {
                            return (
                                <th key={`${tableName}-table-header-${headerIndex}`}>{tableHeader}</th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((tableItem, itemIndex) => {
                        return (
                            <tr key={`${tableName}-table-item-${itemIndex}`}>
                                {tableHeaders.map((tableHeader, headerIndex) => {
                                    return (
                                        <td key={`${tableName}-table-item-${itemIndex}-${headerIndex}`}>{tableItem[tableHeader]}</td>
                                    );
                                })}
                            </tr>);
                    })}
                </tbody>
            </Table>
        </div>
    );
}