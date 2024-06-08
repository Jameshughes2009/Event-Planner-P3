import React, { useState } from "react"; // Importing React and useState hook
import { Link, NavLink } from "react-router-dom"; // Importing routing components from react-router-dom
import { Navbar, Nav, Container, Modal, Tab, Button } from "react-bootstrap"; // Importing Bootstrap components for styling
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Importing FontAwesomeIcon component
// import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"; // Importing FontAwesome icons

import Signup from "./Signup"; // Importing Signup component
import Login from "./Login"; // Importing Login component
import Auth from "../utils/auth"; // Importing Auth utility for authentication

const AppNavbar = () => {
  // State to manage the display of the modal
  const [showModal, setShowModal] = useState(false);
  // State to manage the theme (dark/light)
  const [theme, setTheme] = useState("dark");

  // Function to toggle the theme between dark and light
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Navbar component */}
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
              {/* Link to all events */}
              <Nav.Link as={Link} to="/allEvents">
                All Events
              </Nav.Link>
              {/* Conditional rendering based on user authentication status */}
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
              {/* Theme toggle button */}
              <Button
                variant={theme === "dark" ? "outline-light" : "outline-dark"}
                onClick={toggleTheme}
                className="ml-2"
              >
                {/* {theme === "dark" ? (
                  // <FontAwesomeIcon
                  //   icon={faSun}
                  //   style={{ color: theme === "dark" ? "white" : "black" }}
                  // />
                ) : (
                  // <FontAwesomeIcon
                  //   icon={faMoon}
                  //   style={{ color: theme === "dark" ? "white" : "black" }}
                  // />
                )} */}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Modal for login/signup */}
      <Modal
        size="lg"
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby="signup-modal"
      >
        {/* Tab container to switch between login and signup */}
        <Tab.Container defaultActiveKey="login">
          <Modal.Header closeButton>
            <Modal.Title id="signup-modal">
              <Nav variant="pills">
                <Nav.Item>
                  <Nav.Link
                    eventKey="login"
                    style={{ backgroundColor: "#6495ed" }}
                  >
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="signup"
                    style={{ backgroundColor: "#6495ed" }}
                  >
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
    </>
  );
};

export default AppNavbar; // Exporting AppNavbar component
