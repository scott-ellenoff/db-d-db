import React, { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";
import { Container, Row, Navbar, Nav, Button } from "react-bootstrap";
import { Login, LaunchPage } from "./views";
import posed, { PoseGroup } from "react-pose";


const App = (props) => {
  const [userLogin, setUserLogin] = useState(false);

  useEffect(() => {
    console.log(props)
    loginSuccess();
},[userLogin]);

  const loginSuccess = () => {
    if (localStorage.getItem('loggedIn') != null) {
      setUserLogin(true)
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          {/* <Link to="/login">Login</Link> */}
        </Navbar.Brand>
        <Nav className="mr-auto">
          {userLogin ? <><Nav.Link >History</Nav.Link>
          <Nav.Link>Average</Nav.Link>
          <Nav.Link>Dealer</Nav.Link>
          <Nav.Link>Client</Nav.Link></> : null}
        </Nav>
      </Navbar>
      <Login /> d
    </div>
  );
};


export default App;
