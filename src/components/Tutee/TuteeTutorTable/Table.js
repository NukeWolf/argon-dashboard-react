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
import { Card, Button } from 'react-bootstrap'
import { selectAllTutors } from '../../../stores/tutorReducer';

import { useSelector } from 'react-redux';

const FakePerson = {
  picture:
    "https://media-exp1.licdn.com/dms/image/C4D03AQH1GTxdf7M7Ow/profile-displayphoto-shrink_400_400/0/1593820411981?e=1654732800&v=beta&t=KdVIhnoyk0SDSybEGXYvOL4Aahw7JsWalKw3AFNIcqg",
  name: "Alex Huang",
  email: "alex.huang@yale.edu",
  hourly_rate: 15,
  numRatings: 60,
};

const TableComponent = (props) => {
  const tutors = useSelector(selectAllTutors);
  const {TutorSelected } = props;
  console.log("tutors", tutors);
  return (
    <Card>
      <Card.Body>
        <Table className="align-items-center table-flush" responsive>
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Hourly Rate</th>
              <th scope="col">Ratings</th>
              <th scope="col">Availability</th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            {tutors.map((tutor) => {
              return <TableRow TutorSelected={TutorSelected} person={tutor} />;
            })}

          </tbody>
        </Table>
      </Card.Body>
    </Card>


  );
};

export default TableComponent;

const OnlineOffline = ({ status }) => {
  if (status = "online") {
    return<><div style={{
      height: "5px",
      width: "5px",
      backgroundColor: "#00FF00",
      borderRadius: "50%",
      display: "inline-block",
    marginRight:'10px',

    }}></div><span>Online</span></>
  }
  return <><div style={{
    height: "5px",
    width: "5px",
    backgroundColor: "#bbb",
    borderRadius: "50%",
    display: "inline-block",
    marginRight:'5px',
  }}></div><span>Online</span></>
}

const TableRow = (props) => {
  const {TutorSelected} = props;
  const { picture, first_name,last_name, email, hourly_rate, numRatings, status } = props.person;
  console.log(props.person);
  const onTutorClick = ()=>{console.log("tutor", props.person);
  TutorSelected(props.person);};
  return (
    <tr onClick={onTutorClick}>
      <th scope="row">
        <Media className="align-items-center">
          <a
            className="avatar rounded-circle mr-3" 
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <img style={{width:'100%',height:'100%'}} alt="..." src={picture} />
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
            <Progress max="100" value={numRatings} barClassName="bg-danger" />
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
