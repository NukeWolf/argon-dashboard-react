import moment from "moment";
import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

const TuteeTutorDoneModal = (props) => {
  const { show, setShow, request, onDoneSubmit } = props;
  console.log("modal");
  const [timeslots, setTimeslots] = useState([]);
  const [starrating, setStarRating] = useState(0);
  const [comment, setComment] = useState("");
  const handleClose = () => setShow(false);
  const submitRequestHandler = () => {
    onDoneSubmit(starrating, comment);
  };
  const timeslotsformat = [];

  const sd = moment("2021-01-01 00:00 AM");
  const ed = moment("2021-01-01 11:59 PM");
  const onStarClick = (nextValue, prevValue, name) => {
    setStarRating(nextValue);
  };
  return (
    <>
      <Modal style={{ width: "100%" }} size="xl" isOpen={show}>
        <ModalHeader>
          <h3>
            Make Request for Tutor{" "}
            {request.tutor ? (
              <span>
                {request.tutor.first_name} {request.tutor.last_name}
              </span>
            ) : (
              <></>
            )}
          </h3>
        </ModalHeader>
        <ModalBody>
          <Form>
            <Container>
              <Row>
                <Col xs="12"></Col>
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
                    <Input
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      type="textarea"
                      name="text"
                      id="exampleText"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Container>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitRequestHandler}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TuteeTutorDoneModal;
