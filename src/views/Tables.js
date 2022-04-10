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
  fetchTutors,
  selectAcceptedRequests,
  selectPendingRequests,
} from "../stores/tutorReducer";

const Tables = () => {
  const dispatch = useDispatch();
  const currenttutee = useSelector(currentTutee);
  const pending_requests = useSelector(selectPendingRequests);
  const accepted_requests = useSelector(selectAcceptedRequests);
  useEffect(() => {
    dispatch(fetchTutors());
    dispatch(fetchRequests());
  }, []);
  const [currenttutor, setCurrentTutor] = useState({});
  const [currentrequest, setCurrentRequest] = useState({});
  const [show, setShow] = useState(false);
  const [showRequest, setShowRequest] = useState(false);
  const TutorSelected = (tutor) => {
    setCurrentTutor(tutor);

    setShow(true);
  };
  const onRequestClick = (request) => {
    dispatch(fetchRequests());
  };
  const products = [{ id: 0, name: "test", price: "price" }];
  console.log("currenttutor", currenttutor);

  const SubmitRequest = (timeslots) => {
    console.log("submit", timeslots);
    const outts = [];
    const newtimeslots = [];
    let i = 0;
    let j = 1;
    const tsarray = timeslots.map((ts) => [ts]);
    const redits = tsarray.reduce((pV, cV) => {
      if (
        pV.at(-1).endDate.format("YYYY-MM-DDThh:mm:ss") ===
        cV.at(0).startDate.format("YYYY-MM-DDThh:mm:ss")
      ) {
        return [{ startDate: pV.at(0).startDate, endDate: cV.at(-1).endDate }];
      }
      return pV.concat(cV);
    });
    console.log("redits", redits);

    for (let i = 0; i < redits.length; i++) {
      outts.push({
        start: timeslots[i].startDate.format("YYYY-MM-DDThh:mm:ss"),
        end: timeslots[i].endDate.format("YYYY-MM-DDThh:mm:ss"),
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

      <Container className="mt--7" fluid>
        {/* Table */}
        <Header />

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
                <h3 className="mb-0">Outstanding Requests</h3>
              </CardHeader>

              <OutstandingRequestTableComponent
                requests={pending_requests}
                
                onRequestClick={onRequestClick}
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
                <h3 className="mb-0">Accepted Requests</h3>
              </CardHeader>

              <AcceptedRequestTableComponent
                donedisable={false}
                requests={accepted_requests}
                onRequestClick={onRequestClick}
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
          </div>
        </Row>
        <TuteeTutorRequestModal
          SubmitRequest={SubmitRequest}
          show={show}
          setShow={setShow}
          tutor={currenttutor}
        ></TuteeTutorRequestModal>
      </Container>
    </>
  );
};

export default Tables;
