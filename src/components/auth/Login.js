import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import styles from "./Login.module.css";
import { authAction } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setError("All fields are mandatory!!");
      return;
    }

    try {
      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2usHQbxM7nY7rBadiXNolXPbTdpzQ9A0",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        setLoading(false);
        const data = await res.json();
        dispatch(authAction.login(data.idToken));
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.idToken);
        localStorage.setItem("numberOfMails", 0);
        console.log("User LoggedIn successfully");
        navigate("/home");
      } else {
        setLoading(false);
        const data = await res.json();
        if (data && data.error.message) {
          setError("Login not successful- " + data.error.message);
        } else {
          setError("Some error occured!! Please try again..");
        }
      }
    } catch (error) {
      console.error("Error logging in :", error);
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className="text-center mb-4">Login</h2>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              className="mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              className="mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <p className={styles.errorMessage}>{error}</p>
          {!loading && (
            <Button
              className={styles.btnLogin}
              variant="primary"
              type="submit"
              onClick={handleLogin}>
              Log In
            </Button>
          )}
          {loading && (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner
                animation="border"
                variant="primary"
                role="status"
                size="md">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
        </Form>
        <div className="text-center mt-3">
          <Link to="/forgetpassword" className={styles.forgotPassword}>
            Forgot password?
          </Link>
          <p className={styles.notSignup}>
            Do not have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
