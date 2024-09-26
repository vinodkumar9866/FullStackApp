import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { GiShoppingBag } from "react-icons/gi";
import { StoreState } from "./store/store";
import { useAuth } from "./Auth";

const NavbarPanel = () => {
  const cartProducts = useSelector((state: StoreState) => state.cart);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" sticky="top">
      <Container>
        <Navbar.Brand
          style={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
          }}
        >
          <GiShoppingBag />
          Shopping
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Products
            </Nav.Link>
            <Nav.Link as={Link} to="/cart">
              My Bag {cartProducts.data.length}
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {user?.user?.username || "Profile"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPanel;
