import React, { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../context";

const FormHeader = () => {
  const { setUserData, userData, setTasks } = useGlobalContext();

  const [logoutBtn, setLogoutBtn] = useState(false);

  const logoutUser = async () => {
    setLogoutBtn(true);
    try {
      await axios.delete("/api/v1/auth/logout");
      setTasks(null);
      setUserData(null);
      setLogoutBtn(false);
    } catch (error) {
      setLogoutBtn(false);
    }
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
              <>
                <Link
                  to="/user/account"
                  style={{ textDecoration: "none" }}
                  className="navbar-link"
                >
                  My Account
                </Link>
                <button
                  onClick={logoutUser}
                  className="logout-btn"
                  disabled={logoutBtn}
                >
                  Logout
                </button>
              </>
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
