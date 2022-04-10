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
import AcceptedRequestTableComponent from "components/Tutee/TuteeTutorAcceptedRequest/Table";
import TuteeTutorDoneModal from "components/Tutee/TuteeTutorDoneModal.js/TuteeTutorDoneModal";
import OutstandingRequestTableComponent from "components/Tutee/TuteeTutorOutstandingRequest/Table";
import TuteeTutorRequestModal from "components/Tutee/TuteeTutorRequestModal/TuteeTutorRequestModal";
import TableComponent from "components/Tutee/TuteeTutorTable/Table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardFooter,
  CardHeader,
  Container,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap";
// core components
import {
  addNewRequest,
  currentTutee,
  fetchRequests,
  fetchTutees,
  fetchTutors,
  finalizeRequest,
  patchRequest,
  postTutorRating,
  selectAcceptedRequests,
  selectAllRequests,
  selectFinalizedRequests,
  selectPendingRequests,
} from "../stores/tutorReducer";

const TutorList = () => {
  const dispatch = useDispatch();
  const currenttutee = useSelector(currentTutee);
  const pending_requests = useSelector(selectPendingRequests);
  const accepted_requests = useSelector(selectAcceptedRequests);
  const finalized_requests = useSelector(selectFinalizedRequests);
  
  useEffect(() => {
    dispatch(fetchRequests());
    dispatch(fetchTutees());
    dispatch(fetchTutors());
  }, []);
  const [currenttutor, setCurrentTutor] = useState({});
  const [currentrequest, setCurrentRequest] = useState({});
  const [show, setShow] = useState(false);
  const [doneshow, setDoneShow] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const TutorSelected = (tutor) => {
    setCurrentTutor(tutor);

    setShow(true);
  };
  const onDoneClick = (req) => {
    setDoneShow(true);
    setCurrentRequest(req);
  };
  const onRequestClick = (request) => {
    dispatch(fetchRequests());
  };

  const onDoneSubmit = (starrating,comment ) => {
    const req = currentrequest;
    dispatch(postTutorRating({ 
      request: req.id, tutor: req.tutor.id, comment: comment, rating: starrating }))
    dispatch(patchRequest({ id: req.id, tutee_done: 'True' }));
    if (req.tutor_done) {
      dispatch(finalizeRequest({ id: req.id }));
    }
    setDoneShow(false);
  }
  const products = [{ id: 0, name: "test", price: "price" }];
  console.log("currenttutor", currenttutor);

  const SubmitRequest = (timeslots) => {
    console.log("submit", timeslots);
    const outts = [];
    const newtimeslots = [];
    let i = 0;
    let j = 1;
    const stss = [];
    for (let i = 0; i < timeslots.length; i++) {
      stss.push(timeslots[i].startDate);
      stss.push(timeslots[i].endDate);
    }
    console.log(
      "stss,sss",
      stss.map((st) => st.format())
    );

    const redout = stss.filter(function (item, pos, arr) {
      // Always keep the 0th element as there is nothing before it
      // Then check if each element is different than the one before it
      return (
        pos === 0 ||
        pos === arr.length - 1 ||
        (item.format() !== arr[pos - 1].format() &&
          item.format() !== arr[pos + 1].format())
      );
    });
    console.log(
      "stss,sss",
      redout.map((st) => st.format())
    );

    const redits = [];
    for (let i = 0; i < redout.length; i += 2) {
      redits.push({ startDate: redout[i], endDate: redout[i + 1] });
    }
    console.log(
      "stss,sss",
      redits.map((st) => {
        return {
          startDate: st.startDate.format(),
          endDate: st.endDate.format(),
        };
      })
    );

    console.log("stds", stss, redits, redout);
    /*
    const tsarray = timeslots.map((ts) => ([ts.startDate,ts.endDate, ]));
    const redits = tsarray.reduce((pV, cV) => {
      console.log("cVcc",cV,pV,
      pV.at(-1).endDate.format('YYYY-MM-DDThh:mm:ss'),
      cV.at(0).startDate.format('YYYY-MM-DDThh:mm:ss'),
      pV.at(0).endDate.format('YYYY-MM-DDThh:mm:ss'),
      cV.at(-1).startDate.format('YYYY-MM-DDThh:mm:ss'));
      if (pV.at(-1).endDate.format('YYYY-MM-DDThh:mm:ss') ===
        cV.at(0).startDate.format('YYYY-MM-DDThh:mm:ss')
      ) {
        return [{ startDate: pV.at(0).startDate, endDate: cV.at(-1).endDate },]
      }
      return pV.concat(cV);
    }, tsarray[0]);*/
    console.log("redits", redits);

    for (let i = 0; i < redits.length; i++) {
      outts.push({
        start: redits[i].startDate.format("YYYY-MM-DDThh:mm:ss"),
        end: redits[i].endDate.format("YYYY-MM-DDThh:mm:ss"),
      });
    }
    console.log(currenttutor, currenttutee);
    const payload = {
      timeslots: outts,
      Tutor: currenttutor.id,
      Tutee: currenttutee.id,
      status: "pending",
      zoom_link: "http://zoom.com",
    };
    console.log("payload", payload);
    dispatch(addNewRequest(payload));
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
                <h3 className="mb-0">Tutors</h3>
              </CardHeader>

              <TableComponent TutorSelected={TutorSelected} />
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
            </Card>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Pending Lesson Requests</h3>
              </CardHeader>

              <OutstandingRequestTableComponent
                requests={pending_requests}
                onRequestClick={onRequestClick}
                buttonnotshow={true}
              ></OutstandingRequestTableComponent>

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
            </Card>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Upcoming Lessons</h3>
              </CardHeader>

              <AcceptedRequestTableComponent
                donedisable={(row) => {
                  return row.tutee_done;
                }}
                requests={accepted_requests}
                onRequestClick={onDoneClick}
              />
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
            </Card>
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Finalized Lesson Requests</h3>
              </CardHeader>

              <OutstandingRequestTableComponent
                requests={finalized_requests}
                onRequestClick={onRequestClick}
                buttonnotshow={true}
              ></OutstandingRequestTableComponent>

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
            </Card>
          </div>
        </Row>
        <TuteeTutorRequestModal
          SubmitRequest={SubmitRequest}
          show={show}
          setShow={setShow}
          tutor={currenttutor}
        ></TuteeTutorRequestModal>
        <TuteeTutorDoneModal
          show={doneshow}
          request={currentrequest}
          setShow={setDoneShow}
          onDoneSubmit={onDoneSubmit}
        ></TuteeTutorDoneModal>
      </Container>
    </>
  );
};

export default TutorList;
