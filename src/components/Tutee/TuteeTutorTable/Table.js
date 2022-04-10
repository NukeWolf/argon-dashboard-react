import ReactTableComponent from "components/ReactTableComponent/ReactTableComponent";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Media, Progress, Table } from "reactstrap";
import { selectAllTutors } from "../../../stores/tutorReducer";

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
  const { TutorSelected } = props;
  console.log("tutors", tutors);

  const columns = React.useMemo(
    () => [
      {
        Header: "Picture",
        accessor: "picture", // accessor is the "key" in the data
        Cell: ({ row }) => {
          const { values } = row;
          console.log(row);
          return (
            <Media className="align-items-center">
              <a
                className="avatar rounded-circle mr-3"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  alt="..."
                  src={values.picture}
                />
              </a>
              <Media>
                <span className="mb-0 text-sm">
                  {values.first_name} {values.last_name}
                </span>
              </Media>
            </Media>
          );
        },
      },
      {
        Header: "Name",
        accessor: "first_name", // accessor is the "key" in the data
        Cell: ({ row }) => {
          const { values } = row;
          console.log(row);
          return (
            <>
              {values ? (
                <div>
                  <span>
                    {values.first_name} {values.last_name}{" "}
                  </span>
                </div>
              ) : (
                <></>
              )}
            </>
          );
        },
      },
      {
        Header: "Email",
        accessor: "email", // accessor is the "key" in the data
        Cell: ({ row }) => {
          const { values } = row;
          console.log(row);
          return (
            <>
              {values ? (
                <div>
                  <span>{values.email} </span>
                </div>
              ) : (
                <></>
              )}
            </>
          );
        },
      },
      {
        Header: "Hourly Rate",
        accessor: "hourly_rate", // accessor is the "key" in the data
        Cell: ({ row }) => {
          const { values } = row;
          console.log(row);
          return (
            <>
              {values ? (
                <div>
                  <span>{values.hourly_rate}</span>
                </div>
              ) : (
                <></>
              )}
            </>
          );
        },
      },
      {
        Header: "Ratings",
        accessor: "ratings", // accessor is the "key" in the data
        Cell: ({ row }) => {
          const { original } = row;

          console.log(row);
          return (
            <div className="d-flex align-items-center">
              <span className="mr-2">{original.rating} 	&#9734;</span>
              <div>
                <Progress
                  max="5"
                  value={original.rating}
                  barClassName="bg-danger"
                />
              </div>
            </div>
          );
        },
      },
      {
        Header: "Availability",
        accessor: "status", // accessor is the "key" in the data
        Cell: ({ row }) => {
          const { values } = row;
          console.log(row);
          return (
            <div className="d-flex align-items-center">
              <div>
                <OnlineOffline status={values.status}></OnlineOffline>
              </div>
            </div>
          );
        },
      },

      {
        Header: () => "See Variability",
        id: "clickselect",
        Cell: ({ row }) => (
          <div>
            <Button
              style={{ float: "right" }}
              onClick={() => {
                TutorSelected(row.original);
              }}
              variant="primary"
            >
              See Availability
            </Button>
          </div>
        ),
      },
    ],
    []
  );
  const data = React.useMemo(() => tutors, [tutors]);
  return (
    <ReactTableComponent
      data={data}
      columns={columns}
      searchEnabled
    ></ReactTableComponent>
  );

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
  if ((status = "online")) {
    return (
      <>
        <div
          style={{
            height: "5px",
            width: "5px",
            backgroundColor: "#00FF00",
            borderRadius: "50%",
            display: "inline-block",
            marginRight: "10px",
          }}
        ></div>
        <span>Online</span>
      </>
    );
  }
  return (
    <>
      <div
        style={{
          height: "5px",
          width: "5px",
          backgroundColor: "#bbb",
          borderRadius: "50%",
          display: "inline-block",
          marginRight: "5px",
        }}
      ></div>
      <span>Online</span>
    </>
  );
};

const TableRow = (props) => {
  const { TutorSelected } = props;
  const {
    picture,
    first_name,
    last_name,
    email,
    hourly_rate,
    numRatings,
    status,
  } = props.person;
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
            <img
              style={{ width: "100%", height: "100%" }}
              alt="..."
              src={picture}
            />
          </a>
          <Media>
            <span className="mb-0 text-sm">
              {first_name} {last_name}
            </span>
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
            <Button onClick={onTutorClick} variant="primary">
              Reque
            </Button>
          </div>
        </div>
      </td>
    </tr>
  );
};
