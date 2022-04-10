import React from 'react';
import {
  Badge,
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
import moment from 'moment';
import { Card, Button } from 'react-bootstrap'
import { selectAllTutors } from '../../../stores/tutorReducer';
import ReactTableComponent from 'components/ReactTableComponent/ReactTableComponent';
import { useSelector } from 'react-redux';
import { useTable } from 'react-table';

const FakePerson = {
  picture:
    "https://media-exp1.licdn.com/dms/image/C4D03AQH1GTxdf7M7Ow/profile-displayphoto-shrink_400_400/0/1593820411981?e=1654732800&v=beta&t=KdVIhnoyk0SDSybEGXYvOL4Aahw7JsWalKw3AFNIcqg",
  name: "Alex Huang",
  email: "alex.huang@yale.edu",
  hourly_rate: 15,
  numRatings: 60,
};

const TableComponent = (props) => {
  const { onRequestClick , requests } = props;

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
            const sd = moment(ts.start).format('dddd hh:mm');
            const ed = moment(ts.end).format('dddd hh:mm');
            
            transfor.push({sd, ed });
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
            <Button style={{float:'right'} }onClick={() => { 
              onRequestClick(row.original); }} variant="primary">Request</Button>
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
  
  const tutors = useSelector(selectAllTutors);
  console.log("tutors", tutors);
  return (
    <ReactTableComponent data={data} columns={columns}></ReactTableComponent>

  );
};

export default TableComponent;

const OnlineOffline = ({ status }) => {
  if (status = "online") {
    return <><div style={{
      height: "5px",
      width: "5px",
      backgroundColor: "#00FF00",
      borderRadius: "50%",
      display: "inline-block",
      marginRight: '10px',

    }}></div><span>Online</span></>
  }
  return <><div style={{
    height: "5px",
    width: "5px",
    backgroundColor: "#bbb",
    borderRadius: "50%",
    display: "inline-block",
    marginRight: '5px',
  }}></div><span>Online</span></>
}

const TableRow = (props) => {
  const { TutorSelected } = props;
  const { picture, first_name, last_name, email, hourly_rate, numRatings, status } = props.person;
  console.log(props.person);
  const onTutorClick = () => {
    console.log("tutor", props.person);
    TutorSelected(props.person);
  };
  return (
    <tr onClick={onTutorClick}>
      <th scope="row">
        <Media className="align-items-center">
          <a
            className="avatar rounded-circle mr-3"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <img style={{ width: '100%', height: '100%' }} alt="..." src={picture} />
          </a>
          <Media>
            <span className="mb-0 text-sm">{first_name} {last_name}</span>
          </Media>
        </Media>
      </th>

      <td>{email}</td>
      <td>{hourly_rate}$/hr</td>
      <td>
        <div className="d-flex align-items-center">
          <span className="mr-2">{numRatings}%</span>
          <div>
            <Progress max="5" value={numRatings} barClassName="bg-danger" />
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <div>
            <OnlineOffline status={status}></OnlineOffline>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex align-items-center">
          <div>
            <Button onClick={onTutorClick} variant="primary">Request</Button>

          </div>
        </div>
      </td>
    </tr>
  );
};
