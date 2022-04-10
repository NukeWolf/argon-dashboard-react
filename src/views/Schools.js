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
import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Card, CardBody, CardHeader, Container, Input, Row } from "reactstrap";
// core components
import { fetchTutors } from "../stores/tutorReducer";

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
  const sendEmail = () => {
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY); //will need an API KEY from Sendgrid account once we can make one
    const msg = {
      to: "brendon.gong@yale.edu",
      from: "carlos.herbozoosco@yale.edu",
      subject: "TUUT Reply",
      text: "Thank you for your email. We will get back to you.",
      html: "<strong>Thank you for using TUUT.</strong>",
    };
    sgMail.send(msg);
    window.alert("Email sent!");
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
                <h2 className="mb-0">Partner Schools</h2>
              </CardHeader>
      <CardBody>
        <h3>See if we're partnered with your university:</h3>
        <h2>Yale</h2>

        Can't find your school? Send us a request.
        <Input type="text" name="text" id="exampleText" placeholder="School Name"/>
        <Input type="text" name="text" id="exampleText" placeholder="Email"/>
        <Button onClick={sendEmail}>Send Email</Button>

      </CardBody>

              
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
