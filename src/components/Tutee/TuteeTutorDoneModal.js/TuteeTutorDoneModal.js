
import React, { useState } from 'react';
import moment from 'moment';
import ReactTimeslotCalendar from 'timeslots/js/react-timeslot-calendar';
import { Button, Row, Col, Container, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import { selectAllTutors } from '../../../stores/tutorReducer';

import StarRatingComponent from 'react-star-rating-component';

import { useSelector } from 'react-redux';
import TimeslotSelector from '../../TimeslotSelector/TimeslotSelector';

const TuteeTutorDoneModal = (props) => {
  const { show, setShow, request, onDoneSubmit } = props;
  console.log("modal");
  const [timeslots, setTimeslots] = useState([]);
  const [starrating, setStarRating] = useState(0);
  const [comment, setComment] = useState('');
  const handleClose = () => setShow(false);
  const submitRequestHandler = ()=>{
    console.log("submitstar",starrating, comment);
    onDoneSubmit(starrating, comment);
  }
  const timeslotsformat = [];

  const sd = moment("2021-01-01 00:00 AM");
  const ed = moment("2021-01-01 11:59 PM");
  const onStarClick = (nextValue, prevValue, name) => {
    console.log("star",nextValue,prevValue)
    setStarRating(nextValue);
  }
  return (
    <>


      <Modal style={{ width: "100%" }} size="xl" isOpen={show}>
        <ModalHeader ><h3>RTutor {request.tutor ? (<span>{request.tutor.first_name} {request.tutor.last_name}</span>) : <></>}</h3></ModalHeader>
        <ModalBody>
          <Form>
            <Container>
              <Row>
                <Col xs="12">

                </Col>

              </Row>
              <Row>
                <Col xs="12">
                  <h2>Rating:</h2>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={starrating}
                    onStarClick={onStarClick}
                  />
                  <FormGroup>
                    <Label for="exampleText">Optional Comment</Label>
                    <Input value={comment} onChange={(e)=>{setComment(e.target.value);}} type="textarea" name="text" id="exampleText" />
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitRequestHandler}>Do Something</Button>{' '}
          <Button color="secondary" onClick={handleClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TuteeTutorDoneModal;
