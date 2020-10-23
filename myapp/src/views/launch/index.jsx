import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Navbar, Nav, Button, Spinner, Jumbotron } from "react-bootstrap";
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

    const [navBar, setNavBar] = useState('1')


    console.log(navBar)

    const activeEl = useRef(null);

    const handleSelect = (selectKey) => {
        setNavBar(selectKey)
    }

    useEffect(() => {
        if (loggedIn.oauth || localStorage.getItem('loggedIn')) {
            setUserLogin(true)
            localStorage.setItem('oauth', loggedIn.oauth)
        }

    }, [loggedIn]);

    return (

        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                </Navbar.Brand>

                {userLogin ? <Nav ref={activeEl} className="mr-auto" defaultActiveKey='#home'
                    onSelect={key => handleSelect(key)}>
                    <Nav.Link href='#home' eventKey={1} active={true}>Home</Nav.Link>
                    <Nav.Link href='#history' eventKey={2}>History</Nav.Link>
                    <Nav.Link href='#average' eventKey={3}>Average</Nav.Link>
                    <Nav.Link href='#dealer' eventKey={4}>Dealer</Nav.Link>
                    <Nav.Link href='#client' eventKey={5}>Client</Nav.Link>
                </Nav> : <Nav className="mr-auto">
                        <Nav.Link href='#home'><Button variant="dark" disabled>
                            <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                                Waiting to login...
                            </Button></Nav.Link>
                    </Nav>}
            </Navbar>
            { loggedIn.oauth || localStorage.getItem('loggedIn') ? navBar == '1' ? <Success /> : null : <Login />}
        </div>
    );
};


const Success = () => (
    <div style={{ 'height': '100vh', 'backgroundColor': '#3B73CE' }}>
        <br />
        <Jumbotron style={{'maxWidth': '800px', 'marginLeft': 'auto', 'marginRight':'auto' }}>
            <h1>Hello, user id</h1>
            <p>
                You can know select on the multiple tabs to view your deals, historical data and positions
  </p>
        </Jumbotron>
    </div>
)

const LoadingScreen = () => (
    <div className="_body">
        <Spinner animation="border" role="status" className="_spinner-styles">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>
)

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