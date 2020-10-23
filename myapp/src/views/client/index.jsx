import React, { useState, useEffect } from "react";
import { Container, Row, Table } from "react-bootstrap";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { navigate, Redirect, Router } from "@reach/router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loggedIn } from "../../store/actions";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

function ClientTable() {
    return (
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>Client Name</th>
                <th>Client Data</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>test</td>
                <td>test</td>
            </tr>

        </tbody>
    </Table>
    );
}

export default ClientTable