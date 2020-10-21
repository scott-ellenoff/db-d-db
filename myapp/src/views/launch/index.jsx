import React, { useState, useEffect } from 'react';
import { Container, Row, Navbar, Nav, Button} from "react-bootstrap";
import { Table } from '@material-ui/core';
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { navigate } from "@reach/router";


export const LaunchPage = (props) => {


    return (

        <div styles={{ width: '100vh' }}>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">History</Nav.Link>
                    <Nav.Link href="#pricing">Average</Nav.Link>
                    <Nav.Link href="#features">Dealer</Nav.Link>
                    <Nav.Link href="#pricing">Client</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
}; 