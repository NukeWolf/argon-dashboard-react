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
import sgMail from '@sendgrid/mail';
import {
  Badge,Input,

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
import {Modal, Button} from 'react-bootstrap'
// core components
import { selectAllTutors, fetchTutors } from '../stores/tutorReducer';

import { useSelector, useDispatch} from 'react-redux';
import Header from "components/Headers/Header.js";
import TableComponent from "components/Tutee/TuteeTutorTable/Table";
import TuteeTutorRequestModal from "components/Tutee/TuteeTutorRequestModal/TuteeTutorRequestModal";


const Tables = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchTutors());
  },[]);
  const [currenttutor, setCurrentTutor] = useState({});  
  const [show, setShow] = useState(false);  
  const TutorSelected = (tutor)=>{
    setCurrentTutor(tutor);

    setShow(true);
    console.log("currenttutor", currenttutor);
  }

  return (
    <>
      {/* Page content */}

      <Container className="mt--7" fluid>
        {/* Table */}
        <Header/>
        
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h2 className="mb-0">About</h2>
              </CardHeader>
                <CardBody>

                <Form>
                    <FormGroup>
                    <Label for="exampleEmail">Email</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                    <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>
                </Form>

                </CardBody>
              
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
