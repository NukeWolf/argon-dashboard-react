import React from "react";
import { useGlobalFilter, useTable } from "react-table";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Table,
} from "reactstrap";

const ReactTableComponent = (props) => {
  const { data, columns, searchEnabled } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter);
  return (
    <>
      {searchEnabled ? (
        <Form className="navbar-search navbar-search-light form-inline ml-3 mb-3">
          <FormGroup className="mb-0">
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fas fa-search" />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Search"
                type="text"
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </InputGroup>
          </FormGroup>
        </Form>
      ) : (
        <></>
      )}
      <Table
        className="align-items-center table-flush"
        responsive
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr className="thead-light" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} scope="col">
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default ReactTableComponent;
