/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import React, { useEffect, useState } from "react";
import sgMail from "@sendgrid/mail";
import {
  Badge,
  Input,
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
  CardBody,
} from "reactstrap";
import { Modal, Button } from "react-bootstrap";
// core components
import { selectAllTutors, fetchTutors } from "../stores/tutorReducer";

import { useSelector, useDispatch } from "react-redux";
import Header from "components/Headers/Header.js";
import TableComponent from "components/Tutee/TuteeTutorTable/Table";
import TuteeTutorRequestModal from "components/Tutee/TuteeTutorRequestModal/TuteeTutorRequestModal";

const Tables = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTutors());
  }, []);
  const [currenttutor, setCurrentTutor] = useState({});
  const [show, setShow] = useState(false);
  const TutorSelected = (tutor) => {
    setCurrentTutor(tutor);

    setShow(true);
    console.log("currenttutor", currenttutor);
  };

  return (
    <>
      {/* Page content */}
      <Header />

      <Container className="mt--7" fluid>
        {/* Table */}

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h2 className="mb-0">About Us</h2>
              </CardHeader>
              <CardBody>
                <h3>
                  Tuut. We’re going to revolutionize the definition of
                  accessible peer tutoring for university students across the
                  world. And it starts at Yale. At Tuut, we aim to address the
                  need for last-minute time-sensitive tutoring by bypassing the
                  slow processes of university tutoring center referrals and
                  understaffed TA office hours, which often leave students
                  helpless (and hopeless). With our web application, students
                  who need help can select from any number of peer tutors, with
                  flexible 10-minute slots which allow the tutor to teach with
                  limited time commitment, and students to get help as needed.
                </h3>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
