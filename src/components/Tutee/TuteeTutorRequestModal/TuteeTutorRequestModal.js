
import React, {useState} from 'react';
import moment from 'moment';
import ReactTimeslotCalendar from 'timeslots/js/react-timeslot-calendar';
import { Button, Row, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { selectAllTutors } from '../../../stores/tutorReducer';

import { useSelector } from 'react-redux';
import TimeslotSelector from '../../TimeslotSelector/TimeslotSelector';
const FakePerson = {
  picture:
    "https://media-exp1.licdn.com/dms/image/C4D03AQH1GTxdf7M7Ow/profile-displayphoto-shrink_400_400/0/1593820411981?e=1654732800&v=beta&t=KdVIhnoyk0SDSybEGXYvOL4Aahw7JsWalKw3AFNIcqg",
  name: "Alex Huang",
  email: "alex.huang@yale.edu",
  hourlyRate: 15,
  ratings: 60,
};

const TuteeTutorRequestModal = (props) => {
  const { show, setShow, tutor, SubmitRequest } = props;
  console.log("modal");
  const [timeslots, setTimeslots] = useState([]);
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
  const  timeslotsformat = [];
  const sd = moment("2021-01-01 01:00");
  const ed = moment("2021-01-01 23:00");
  for(let m = sd;m.isBefore(ed);m.add(15,'minutes')){
    const m2 = m.clone().add(15,'minutes');
    timeslotsformat.push([m.format("HH:mm"),m2.format("HH:mm")])
  } 
  console.log("timeslotformat",timeslotsformat);
  /*let timeslotsformat = [
    ['09:30 AM', '11:30 AM'], // 1:00 AM - 2:00 AM
    ['13', '14'], // 1:00 AM - 2:00 AM
    ['14', '15'], // 1:00 AM - 2:00 AM
    ['16:30', '17:30'], // 1:00 AM - 2:00 AM
    ['17', '18'], // 1:00 AM - 2:00 AM
  ];*/
  const onSelectTimeslot = (allTimeslots, lastSelectedTimeslot) => {
    console.log(lastSelectedTimeslot.startDate); 
    console.log(lastSelectedTimeslot.endDate); 
    console.log(lastSelectedTimeslot.startDate); 
    console.log(lastSelectedTimeslot.endDate); 
    console.log(allTimeslots); 
    setTimeslots(allTimeslots);
  };
  const submitRequestHandler = ()=>{
    console.log("timeslots",timeslots);
    SubmitRequest(timeslots);
    setShow(false);
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal style={{ width: "100%" }} size="xl" isOpen={show}>
        <ModalHeader ><h3>Make Request for Tutor {tutor.first_name} {tutor.last_name}</h3></ModalHeader>
        <ModalBody>
          <Form>
            <Container>
              <Row>
                <Col xs="12">
                  <ReactTimeslotCalendar
                    maxTimeslots={60}
                    timeslotProps={{format:"hh:mm"}}
                    initialDate={moment().format()}
                    disabledTimeslots={disabledTimeslots}
                    timeslots={timeslotsformat}
                    onSelectTimeslot ={onSelectTimeslot}
                  />

                </Col>

              </Row>
              <Row>
              <Col xs="12">

                </Col>
              </Row>
            </Container>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitRequestHandler}>Schedule Times</Button>{' '}
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TuteeTutorRequestModal;
