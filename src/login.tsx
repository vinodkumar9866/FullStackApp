import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, InputGroup } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import { axiosRequest } from "./utils/axios";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUpLocalUser, user } = useAuth();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const location = useLocation();
  // Redirect if already authenticated
  useEffect(() => {
    if (user && window.location.pathname === "/login") {
      const redirectTo = location.state?.from?.pathname || "/dashboard";
      navigate(redirectTo, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loginUser = async () => {
    axiosRequest("post", "/login", { username, password })
      .then((response) => {
        // dispatch(setUser(response.data));
        setUpLocalUser(response.data);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100 bg-light"
    >
      <Row className="w-100">
        <Col xs={10} md={3} className="mx-auto">
          <div className="text-center mb-4">
            <h2>Login</h2>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-4">
              <Form.Label>Username</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaUser />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaLock />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={!username || !password}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
