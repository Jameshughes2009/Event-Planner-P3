import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab, Button } from "react-bootstrap";
import Signup from "./Signup";
import Login from "./Login";
import Auth from "../utils/auth";
import "./style.css"

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <Navbar className={`navbar navbar-expand-lg navbar-${theme} bg-${theme}`}>
        <Container fluid>
          <Navbar.Brand className="navbar-brand fs-2" as={Link} to="/">
            James and Hement Event Planner
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="d-flex flex-row-reverse">
            <Nav className="ml-auto d-flex">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/allEvents">
                All Events
              </Nav.Link>
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to="/myEvents">
                    My Events
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Nav.Link>
              )}
              <Button
                variant={theme === "dark" ? "outline-light" : "outline-dark"}
                onClick={toggleTheme}
                className="ml-2"
              >
                {/* Theme icons */}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

const AuthModal = ({ showModal, setShowModal }) => {
  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
      aria-labelledby="signup-modal"
    >
      <Tab.Container defaultActiveKey="login">
        <Modal.Header closeButton>
          <Modal.Title id="signup-modal">
            <Nav variant="pills">
              <Nav.Item>
                <Nav.Link eventKey="login" style={{ backgroundColor: "#6495ed" }}>
                  Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="signup" style={{ backgroundColor: "#6495ed" }}>
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Login handleModalClose={() => setShowModal(false)} />
            </Tab.Pane>
            <Tab.Pane eventKey="signup">
              <Signup handleModalClose={() => setShowModal(false)} />
            </Tab.Pane>
          </Tab.Content>
        </Modal.Body>
      </Tab.Container>
    </Modal>
  );
};

export default AppNavbar;