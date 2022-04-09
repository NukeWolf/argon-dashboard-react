import React, { useEffect, useState } from "react";

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
import {Button} from 'react-bootstrap';

import { useTable } from 'react-table';

import { selectAllTutors } from '../../../stores/tutorReducer';

import { useSelector } from 'react-redux';
import moment from "moment";

const FakePerson = {
  picture:
    "https://media-exp1.licdn.com/dms/image/C4D03AQH1GTxdf7M7Ow/profile-displayphoto-shrink_400_400/0/1593820411981?e=1654732800&v=beta&t=KdVIhnoyk0SDSybEGXYvOL4Aahw7JsWalKw3AFNIcqg",
  name: "Alex Huang",
  email: "alex.huang@yale.edu",
  hourlyRate: 15,
  ratings: 60,
};

const OutstandingRequestTableComponent = (props) => {
  const { onRequestClick , requests} = props;
  const columns = React.useMemo(
    () => [
      {
        Header: 'Tutor',
        accessor: 'tutor', // accessor is the "key" in the data
        Cell: ({ row }) => {
          const {tutor} = row.values;
          console.log(row);
         return <>{tutor ? (<div>
            <span>{tutor.first_name} {tutor.last_name} </span>
          </div>) : <></>}</>
        },
      },
      {
        Header: 'Timeslots',
        accessor: 'timeslots',
        Cell: ({ row }) => {
          const {timeslots, tutor} = row.values;
          console.log(timeslots);
          const transfor = [];
          for(let i =0;i < timeslots.length;i++){
            const ts = timeslots[i];
            transfor.push({sd : moment(ts.start).format('dddd hh:mm'),
            ed : moment(ts.end).format('dddd hh:mm')});
          }
          console.log(transfor);
          const tsmapper = ()=>{
         return <> {timeslots.map((ts)=>{<span>{moment(ts.start).format('dddd hh:mm')} {moment(ts.end).format('dddd hh:mm')} </span>})}</>
            
          }
         return <>{transfor.map((ts)=>(<span style={{marginRight:4}}>{ts.sd}-{ts.ed}</span>))} </>
        },
      },
      {
        Header: () => "",
        id: 'clickselect',
        Cell: ({ row }) => (
          <div>
            <Button style={{float:'right'} }onClick={() => { onRequestClick(row); }} variant="primary">Request</Button>
          </div>
        ),
      },
    ],
    []
  );
  const data = React.useMemo(
    () => requests,
    [requests]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  const tutors = useSelector(selectAllTutors);
  console.log("tutors", tutors);
  return (
    <Table className="align-items-center table-flush" 
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

  );
};

export default OutstandingRequestTableComponent;

const TableRow = (props) => {
  const { cell, } = props;
  const { col1, col2 } = cell;
  console.log(props.person);
  return (
    <tr {...cell.getCellProps()}>

      <td>{col1}</td>
      <td>{col2}</td>


    </tr>
  );
};
