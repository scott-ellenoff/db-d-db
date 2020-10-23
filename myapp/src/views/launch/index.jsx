import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Button, Spinner, Jumbotron } from "react-bootstrap";
import { default as Login } from '../login';
import "./styles.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loggedIn, serverActive } from "../../store/actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from "../../static/logo.png";
import {default as AvgTable} from "../average"
import {default as ClientTable} from "../client"
import {default as Dealer} from "../dealer"
import {default as DataStream} from "../history"
import {default as LoadingScreen} from "../../components/index";


const LaunchPage = (props) => {

    const { loggedIn, action, serverActive } = props;

    const [userLogin, setUserLogin] = useState(false);

    const [wait, setWait] = useState(false);

    const [navBar, setNavBar] = useState('1')

    const activeEl = useRef(null);

    const handleSelect = (selectKey) => {
        setNavBar(selectKey)
    }

    const signOut = () => {
        localStorage.clear();
        loggedIn.oauth = null;
        console.log(props)
        setUserLogin(false)
    }


    useEffect(() => {
        if (loggedIn.oauth || localStorage.getItem('loggedIn')) {
            setUserLogin(true)
            localStorage.setItem('oauth', loggedIn.oauth)
        }

    }, [loggedIn]);

    return wait ? (

        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>
                    <img src={Logo} alt="Logo" className="_imageBlock" />
                </Navbar.Brand>
                {userLogin ? <Nav  className="mr-auto" defaultActiveKey='#home'
                    onSelect={key => handleSelect(key)}>
                    <Nav.Link  href='#home' eventKey={1}><span ref ={navBar == '1' ? activeEl : null}>Home</span></Nav.Link>
                    <Nav.Link ref={navBar == '2' ? activeEl : null} href='#history' eventKey={2}>History</Nav.Link>
                    <Nav.Link ref={navBar == '3' ? activeEl : null} href='#average' eventKey={3}>Average</Nav.Link>
                    <Nav.Link ref={navBar == '4' ? activeEl : null} href='#dealer' eventKey={4}>Dealer</Nav.Link>
                    <Nav.Link ref={navBar == '5' ? activeEl : null} href='#client' eventKey={5}>Client</Nav.Link>
                    <button className={"_sign-out-button"} onClick={()=>signOut()}>Sign Out</button>
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
            { loggedIn.oauth || localStorage.getItem('loggedIn') ? 
            navBar == '1' ? <Success /> : 
            navBar == '2' ? <DataStream />:
            navBar == "3" ? <AvgTable /> :
            navBar == '4' ? <Dealer /> :
            navBar == "5" ? <ClientTable /> : null : <Login />}
        </div>
    ) : <LoadingScreen />;
};


const Success = () => (
    <div className="_succes-container">
        <br />
        <Jumbotron className="_success-block">
            <h1>Hello, user id</h1>
            <p>
                You can know select on the multiple tabs to view your deals, historical data and positions
  </p>
        </Jumbotron>
    </div>
)


const mapStateToProps = ({ loggedIn }) => {
    return {
        loggedIn,
        serverActive
    };
};

const mapDispatchToProps = (dispatch) => {
    const actions = {
        loggedIn,
        serverActive
    };
    return {
        action: bindActionCreators(actions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LaunchPage)