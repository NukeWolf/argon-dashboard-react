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
import { Button } from 'react-bootstrap';
import ReactTableComponent from "components/ReactTableComponent/ReactTableComponent";
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

const AcceptedRequestTableComponent = (props) => {
  const { onRequestClick, requests, donedisable } = props;
  const columns = React.useMemo(
    () => [
      {
        Header: 'Tutor',
        accessor: 'tutor', // accessor is the "key" in the data
        Cell: ({ row }) => {
          const { tutor } = row.values;
          console.log(row);
          return <>{tutor ? (<div>
            <span>{tutor.first_name} {tutor.last_name} </span>
          </div>) : <></>}</>
        },
      },
      {
        Header: 'Tutee',
        accessor: 'tutee', // accessor is the "key" in the data
        Cell: ({ row }) => {
          const { tutee } = row.values;
          console.log(row);
          return <>{tutee ? (<div>
            <span>{tutee.first_name} {tutee.last_name} </span>
          </div>) : <></>}</>
        },
      },
      {
        Header: 'Timeslots',
        accessor: 'timeslots',
        Cell: ({ row }) => {
          const { timeslots, tutor } = row.values;
          console.log(timeslots);
          const transfor = [];
          for (let i = 0; i < timeslots.length; i++) {
            const ts = timeslots[i];
            transfor.push({
              sd: moment(ts.start).format('dddd hh:mm'),
              ed: moment(ts.end).format('dddd hh:mm')
            });
          }
          console.log(transfor);
          const tsmapper = () => {
            return <> {timeslots.map((ts) => { <span>{moment(ts.start).format('dddd hh:mm')} {moment(ts.end).format('dddd hh:mm')} </span> })}</>

          }
          return <>{transfor.map((ts) => (<span style={{ marginRight: 4 }}>{ts.sd}-{ts.ed}</span>))} </>
        },
      },
      {
        Header: 'Zoom',
        accessor: 'zoom_link',
      },
      {
        Header: () => "",
        id: 'clickselect',
        Cell: ({ row }) => {
          const disable = donedisable(row.original);

          return <div>
            <Button disabled={disable} style={{ float: 'right' }} onClick={() => {
              onRequestClick(row.original);
            }} variant="primary">Done</Button>
          </div>
        },
      },
    ],
    []
  );
  const data = React.useMemo(
    () => requests,
    [requests]
  );

  const tutors = useSelector(selectAllTutors);
  console.log("tutors", tutors);
  return (
    <ReactTableComponent data={data} columns={columns}></ReactTableComponent>
  );
};

export default AcceptedRequestTableComponent;

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
