import React, { useEffect, useState } from "react";
import { Router, Link } from "@reach/router";
import { Container, Row, Navbar, Nav, Button } from "react-bootstrap";
import { Login, LaunchPage } from "./views";
import posed, { PoseGroup } from "react-pose";


const App = () => {

  return (
    <div styles={{ width: '100vh' }}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
        <Link to="/login">Login</Link> 
        </Navbar.Brand>
        {/* {loggedIn ? <Nav className="mr-auto">
          <Nav.Link >History</Nav.Link>
          <Nav.Link>Average</Nav.Link>
          <Nav.Link>Dealer</Nav.Link>
          <Nav.Link>Client</Nav.Link>
        </Nav> : <Nav className='mr-auto'>Not Logged In</Nav>} */}
        <Nav className="mr-auto">
          <Nav.Link >History</Nav.Link>
          <Nav.Link>Average</Nav.Link>
          <Nav.Link>Dealer</Nav.Link>
          <Nav.Link>Client</Nav.Link>
        </Nav>
      </Navbar>
      <Router>
      <Login path="/login" />
    </Router>
    </div>
    // <>
    // {/* <LaunchPage /> */}
    // <Router>
    //   <LaunchPage path="/" />
    //   <Login path="/login" />
    // </Router>
    // </>
  );
};


export default App;
