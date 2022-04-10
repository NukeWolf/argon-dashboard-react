import React from 'react';
import { useTable } from 'react-table';
import { Table } from 'reactstrap';
const ReactTableComponent = (props) => {
    const { data, columns } = props;
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });
    return <Table className="align-items-center table-flush"
        responsive {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
                <tr className="thead-light" {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th
                            {...column.getHeaderProps()}
                            scope="col"
                        >
                            {column.render('Header')}
                        </th>
                    ))}
                </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return (
                                <td
                                >
                                    {cell.render('Cell')}
                                </td>
                            )
                        })}
                    </tr>
                )
            })}
        </tbody>
    </Table>
};

export default ReactTableComponent;