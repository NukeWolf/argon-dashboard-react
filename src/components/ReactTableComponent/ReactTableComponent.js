import {
  Badge,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  Media,
  Form,
  FormGroup,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

import React from "react";
import { useTable, useGlobalFilter } from "react-table";
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
