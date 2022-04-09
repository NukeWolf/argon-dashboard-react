
import React from 'react';
import moment from 'moment';
import ReactTimeslotCalendar from 'react-timeslot-calendar';

import { Button, Row, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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

const TuteeTutorRequestModal = (props) => {
  const { show, setShow, tutor } = props;
  console.log("modal");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let disabledTimeslots = [
    {
        startDate: '12:00:00 AM',
        format: 'MMMM Do YYYY, h:mm:ss A',
    },
    {
        startDate: 'May 1st 2017, 3:00:00 PM',
        format: 'MMMM Do YYYY, h:mm:ss A',
    },
    {
        startDate: 'May 5th 2017, 6:00:00 PM',
        format: 'MMMM Do YYYY, h:mm:ss A',
    },
];
let timeslots = [
  ['12', '13'], // 1:00 AM - 2:00 AM
  ['13', '14'], // 1:00 AM - 2:00 AM
  ['14', '15'], // 1:00 AM - 2:00 AM
];
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal style={{width:"100%"}} size="xl" isOpen={show}>
        <ModalHeader ><h3>Make Request for Tutor {tutor.name}</h3></ModalHeader>
        <ModalBody>
          <Form>
            <Container>
              <Row>
                <Col xs="12">
                  <ReactTimeslotCalendar
                    maxTimeslots ={4}
                    initialDate={moment().format()}
                    disabledTimeslots={disabledTimeslots}
                    timeslots={timeslots}
                  />
                </Col>

              </Row>
            </Container>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClose}>Do Something</Button>{' '}
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TuteeTutorRequestModal;
