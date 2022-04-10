/*!

=========================================================
* Argon Design System React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-design-system-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-design-system-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import SimpleFooter from "components/Footers/SimpleFooter.js";
// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import React from "react";
// reactstrap components
import { Card, Col, Container, Row } from "reactstrap";

import { connect } from "react-redux";
import { is_tutee } from "stores/tutorReducer";
import { is_tutor } from "stores/tutorReducer";
class Profile extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <div className="landing-something">
        <DemoNavbar />
        <main className="profile-page" ref="main">
          <section className="section-profile-cover section-shaped my-0">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Row>
                  <Col>
                    <a href="/tutee">
                      <Card className="card-profile shadow mt--300">
                        <div className="px-4">
                          <div className="text-center mt-5">
                            <h2>I'm a student</h2>
                          </div>
                          <div className="mt-5 py-5 border-top text-center">
                            <i
                              class="fa fa-solid fa-graduation-cap fa-8x"
                              style={{ fontSize: "9em" }}
                            ></i>
                          </div>
                        </div>
                      </Card>
                    </a>
                  </Col>
                  <Col>
                    <a href="/tutor">
                      <Card className="card-profile shadow mt--300">
                        <div className="px-4">
                          <div className="text-center mt-5">
                            <h2>I'm a tutor</h2>
                          </div>
                          <div className="mt-5 py-5 border-top text-center">
                            <i
                              class="fa fa-solid fa-briefcase fa-8x"
                              style={{ fontSize: "9em" }}
                            ></i>
                          </div>
                        </div>
                      </Card>
                    </a>
                  </Col>
              </Row>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </div>
    );
  }
}

export default connect((state) => ({
  is_tutee: is_tutee(state),
  is_tutor: is_tutor(state),
}))(Profile);
