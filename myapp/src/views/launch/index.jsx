import React, { useState, useEffect } from 'react';
import { Container, Row, Navbar, Nav, Button } from "react-bootstrap";
import { Table } from '@material-ui/core';
import { default as Login } from '../login';
import "./styles.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loggedIn } from "../../store/actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router, Link } from "@reach/router";


const LaunchPage = (props) => {

    const { loggedIn, action } = props;

    const [userLogin, setUserLogin] = useState(false);

    useEffect(() => {    
    if (loggedIn.oauth) setUserLogin(true)
    }, [loggedIn]);

    return (

        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                </Navbar.Brand>
                {userLogin ? <Nav className="mr-auto">
                    <Nav.Link >History</Nav.Link>
                    <Nav.Link>Average</Nav.Link>
                    <Nav.Link>Dealer</Nav.Link>
                    <Nav.Link>Client</Nav.Link>
                </Nav> : <Nav.Link>Waiting to login....</Nav.Link>}
            </Navbar>
            <Login />
        </div>
    );
}; 

const mapStateToProps = ({ loggedIn }) => {
    return {
      loggedIn,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    const actions = {
      loggedIn,
    };
    return {
      action: bindActionCreators(actions, dispatch),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(LaunchPage)