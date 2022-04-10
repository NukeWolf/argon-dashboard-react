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

import { selectAllTutors } from '../../../stores/tutorReducer';

import { useSelector } from 'react-redux';

const FakePerson = {
  picture:
    "https://media-exp1.licdn.com/dms/image/C4D03AQH1GTxdf7M7Ow/profile-displayphoto-shrink_400_400/0/1593820411981?e=1654732800&v=beta&t=KdVIhnoyk0SDSybEGXYvOL4Aahw7JsWalKw3AFNIcqg",
  name: "Alex Huang",
  email: "alex.huang@yale.edu",
  hourlyRate: 15,
  ratings: 60,
};

const TableComponent = (props) => {
  const tutors = useSelector(selectAllTutors);
  console.log("tutors",tutors);
  return (
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
        {tutors.map((tutor)=>{
          return <TableRow person={tutor} />;
        })}
        
      </tbody>
    </Table>
  );
};

export default TableComponent;

const TableRow = (props) => {
  const { picture, name, email, hourlyRate, ratings } = props.person;
  console.log(props.person);
  return (
    <tr>
      <th scope="row">
        <Media className="align-items-center">
          <a
            className="avatar rounded-circle mr-3"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <img alt="..." src={picture} />
          </a>
          <Media>
            <span className="mb-0 text-sm">{name}</span>
          </Media>
        </Media>
      </th>

      <td>{email}</td>
      <td>{hourlyRate}$/hr</td>
      <td>
        <div className="d-flex align-items-center">
          <span className="mr-2">{ratings}%</span>
          <div>
            <Progress max="5" value={ratings} barClassName="bg-danger" />
          </div>
        </div>
      </td>
      <td className="text-right">
        <UncontrolledDropdown>
          <DropdownToggle
            className="btn-icon-only text-light"
            href="#pablo"
            role="button"
            size="sm"
            color=""
            onClick={(e) => e.preventDefault()}
          >
            <i className="fas fa-ellipsis-v" />
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-arrow" right>
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Action
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Another action
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Something else here
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
};
