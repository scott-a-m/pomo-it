import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const FormHeader = ({ userData, setUserData }) => {
  const [logoutBtn, setLogoutBtn] = useState(false);
  const navigate = useNavigate();

  const logoutUser = async () => {
    setLogoutBtn(true);
    try {
      await axios.delete("/api/v1/auth/logout");
      setUserData(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
    setLogoutBtn(false);
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
              <button
                onClick={logoutUser}
                className="logout-btn"
                disabled={logoutBtn}
              >
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
