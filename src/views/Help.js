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
                <h2 className="mb-0">Frequently Asked Questions</h2>
              </CardHeader>
              <CardBody>
                <h3>How are tutors incentivized to join Tuut?</h3>

                <p>
                  Tutors set their own hourly wages, with the cap determined by
                  their experience (# of sessions) and ratings.
                </p>

                <h3>How can FGLI students access Tuut?</h3>
                <p>
                  Tuut® connects with university systems to reimburse low
                  income students for their lessons, ensuring that we
                  can help all students of all financial backgrounds. Please click on
                  our 'partner schools' sidebar option to see if your university is 
                  partnered with us. You can also shoot us a partner request to
                  put your university on our radar for future partnerships.
                </p>

                <h3>What separates Tuut from other tutoring platforms?</h3>
                <p>
                  Flexibility of time slots. Promptness of academic support.
                  Accessibility to students of all economic backgrounds. Code of
                  conduct to ensure academic integrity, and a safe and welcoming
                  environment.
                </p>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
