import React,{useState} from 'react';
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import styles from './Login.module.css'; 
import { authAction } from '../../store/authSlice';
import {Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError]= useState("");
    const navigate= useNavigate();
    const dispatch = useDispatch();
  
    const handleLogin = async(e) => {
      e.preventDefault();
      setLoading(true)
      
      if(!email || !password ){
        setError("All fields are mandatory!!");
        return
      }
  
      try {
      const res= await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBHa61kQog4vVm2Jfiy0tLddA7Xx0cmcXM', {
        method:'POST',
        body: JSON.stringify({
          email:email,
          password:password,
          returnSecureToken: true
        }),
        headers: {
          'content-type' : 'application/json'
        }
      })
       if(res.ok){
          setLoading(false);
          const data= await res.json()
          dispatch(authAction.login(data.idToken));
          localStorage.setItem("email", data.email.replace(/[@.]/g, ""));
          localStorage.setItem("token", data.idToken);          
          console.log('User LoggedIn successfully');
          navigate('/home');
          }
          else{
              setLoading(false);
            const data= await res.json();
              if(data && data.error.message){
                setError("Login not successful- " + data.error.message)
              } else{
                setError("Some error occured!! Please try again..")
              }
            }
      } catch (error) {
        console.error('Error logging in :', error);
      }
      setEmail('');
      setPassword("");
      
    };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <h2 className="text-center mb-4">Login</h2>
        <Form>
          <Form.Group controlId="formBasicEmail" >
            <Form.Control type="email" placeholder="Email" className='mb-3' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" className='mt-2' value={password}  onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>

          <p className={styles.errorMessage}>{error}</p>
          {!loading && <Button className={styles.btnLogin} variant="primary" type="submit" onClick={handleLogin}>
            Log In
          </Button>}
          {loading && <Spinner animation='border' size='sm'/>}
          {loading && <h2>Submitting Data...</h2>}
        </Form>
        <div className="text-center mt-3">
          <a href="#forgot-password" className={styles.forgotPassword}>
            Forgot password?
          </a>
          <p className={styles.notSignup}>
            Do not have an account? <a href="#signup">Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
