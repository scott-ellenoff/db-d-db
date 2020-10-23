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


  function DealerName() {
    return (
      <Table striped bordered hover>
        <thead>
            <tr>
                <th>Dealer</th>
                <th>End Position</th>
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

function RealisedPL() {
  return (
  <Table striped bordered hover>
      <thead>
          <tr>
            <th>Dealer</th>
            <th>Realised Profit</th>
            <th>Realised Loss</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
          </tr>

      </tbody>
  </Table>
  );
}

function EffectivePL() {
  return (
  <Table striped bordered hover>
      <thead>
          <tr>
              <td>Dealer</td>
              <th>Effective Profit</th>
              <td>Effective Loss</td>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>test</td>
              <td>test</td>
              <td>test</td>
          </tr>

      </tbody>
  </Table>
  );
}

const Dealer = (props) => {
  return (
    <><DealerName /><RealisedPL /><EffectivePL /></>
  )
}

export default Dealer