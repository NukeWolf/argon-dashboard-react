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
import { connect } from "react-redux";
import { loginSubmit } from "stores/tutorReducer";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  UncontrolledAlert,
} from "reactstrap";
import { client } from "../../stores/client";

class Login extends React.Component {
  constructor() {
    super();
    this.state = { error: false };
  }
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }

  async onSubmit(e) {
    e.preventDefault();
    try {
      /*this.props.loginSubmit({
        username: this.state.username,
        password: this.state.password,
      });*/
      const response = await client.post(
        process.env.REACT_APP_API_URL + "/api-token-auth/",
        {
          username: this.state.username,
          password: this.state.password,
        }
      );
      localStorage.setItem("token", response.data.token);
      this.props.history.push("/select");
    } catch (e) {
      console.log(e);
      this.setState({ error: true });
    }
  }

  render() {
    return (
      <div className="landing-something">
        <DemoNavbar />
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <Container className="pt-lg-7">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                      <div className="text-center text-muted mb-4">
                        <small>Sign in with credentials</small>
                      </div>
                      <Form role="form" onSubmit={this.onSubmit.bind(this)}>
                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-single-02" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Username"
                              type="username"
                              required
                              onChange={(e) => {
                                this.setState({ username: e.target.value });
                              }}
                            />
                          </InputGroup>
                        </FormGroup>
                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText>
                                <i className="ni ni-lock-circle-open" />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              placeholder="Password"
                              type="password"
                              autoComplete="off"
                              required
                              onChange={(e) => {
                                this.setState({ password: e.target.value });
                              }}
                            />
                          </InputGroup>
                        </FormGroup>
                        {this.state.error ? (
                          <UncontrolledAlert color="warning" fade={false}>
                            <span className="alert-inner--icon">
                              <i className="ni ni-notification-70" />
                            </span>{" "}
                            <span className="alert-inner--text">
                              <strong>Error</strong>: Login Failed
                            </span>
                          </UncontrolledAlert>
                        ) : (
                          <></>
                        )}
                        <div className="custom-control custom-control-alternative custom-checkbox">
                          <input
                            className="custom-control-input"
                            id=" customCheckLogin"
                            type="checkbox"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor=" customCheckLogin"
                          >
                            <span>Remember me</span>
                          </label>
                        </div>
                        <div className="text-center">
                          <Button
                            className="my-4"
                            color="primary"
                            type="submit"
                          >
                            Sign in
                          </Button>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col xs="6"></Col>
                    <Col className="text-right" xs="6">
                      <a className="text-light" href="/register">
                        <small>Create new account</small>
                      </a>
                    </Col>
                  </Row>
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

export default connect(null, { loginSubmit })(Login);
