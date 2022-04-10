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
import { Modal, Button } from "react-bootstrap";
// core components
import {
  selectAllTutors,
  finalizeRequest,
  sendDone,
  postTutorRating,
  patchRequest,
  selectAcceptedRequests,
  fetchTutees,
  fetchTutors,
  selectPendingRequests,
  sendEmailAcceptance,
  fetchRequests
} from "../stores/tutorReducer";
import OutstandingRequestTableComponent from "components/Tutee/TuteeTutorOutstandingRequest/Table";
import AcceptedRequestTableComponent from "components/Tutee/TuteeTutorAcceptedRequest/Table";

import { useSelector, useDispatch } from "react-redux";
import Header from "components/Headers/Header.js";
import TableComponent from "components/Tutor/TutorIncomingRequestsTable/Table";
import TuteeTutorRequestModal from "components/Tutee/TuteeTutorRequestModal/TuteeTutorRequestModal";
import TuteeTutorDoneModal from "components/Tutee/TuteeTutorDoneModal.js/TuteeTutorDoneModal";
import { reduceEachLeadingCommentRange } from "typescript";
const RequestList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRequests());
    dispatch(fetchTutees());
    dispatch(fetchTutors());
  }, []);

  const pending_requests = useSelector(selectPendingRequests);
  const accepted_requests = useSelector(selectAcceptedRequests);
  const [currenttutor, setCurrentTutor] = useState({});
  const [currentrequest, setCurrentRequest] = useState({});
  const [show, setShow] = useState(false);
  const [doneshow, setDoneShow] = useState(false);
  const onRequestClick = (request) => {
    console.log("rress", request);
    dispatch(sendEmailAcceptance({ id: request.id }));
  };
  const onDoneClick = (req) => {
    setDoneShow(true);
    setCurrentRequest(req);
    dispatch(patchRequest({ id: req.id, tutor_done: 'True' }));
    if (req.tutee_done) {
      dispatch(finalizeRequest({ id: req.id }));
    }
  };
  const onDoneSubmit = (comment, starrating) => {
    const req = currentrequest;
    dispatch(postTutorRating({ request: req.id, tutor: req.tutor.id, comment: comment, rating: starrating }))
    dispatch(patchRequest({ id: req.id, tutor_done: 'True' }));
    if (req.tutee_done) {
      dispatch(finalizeRequest({ id: req.id }));
    }
  }

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
                <h3 className="mb-0">Incoming Requests</h3>
              </CardHeader>

              <OutstandingRequestTableComponent
                requests={pending_requests}
                onRequestClick={onRequestClick}
              ></OutstandingRequestTableComponent>
              <CardFooter className="py-4">
              </CardFooter>
            </Card>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Accepted Requests</h3>
              </CardHeader>

              <AcceptedRequestTableComponent
                donedisable={(row) => {
                  console.log(row);
                  return row.tutor_done;
                }}
                requests={accepted_requests}
                onRequestClick={onDoneClick} />
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card >
          </div >
        </Row >
        <TuteeTutorRequestModal
          show={show}
          setShow={setShow}
          tutor={currenttutor}
        ></TuteeTutorRequestModal>

      </Container >
    </>
  );
};

export default RequestList;
