import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FormHeader = ({
  userData,
  setUserData,
  setTasks,
  setCreateTaskWindow,
}) => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    await axios.delete("/api/v1/auth/logout");
    console.log(userData);
    setUserData(null);
    setTasks(null);
    setCreateTaskWindow(false);
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand className="logo">
          {" "}
          Pomo-it <FontAwesomeIcon icon={faSeedling} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              className="navbar-link"
            >
              Home
            </Link>
          </Nav>
          <Nav>
            {userData ? (
              <button onClick={logoutUser} className="logout-btn">
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="logout-btn">Login</button>
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FormHeader;
