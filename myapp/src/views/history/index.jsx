import React, { useState, useEffect } from 'react';
import { Container, Row, Table } from "react-bootstrap";
import { useObservable } from 'rxjs-hooks';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import {history} from '../../utils/path';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getHistory } from "../../store/actions";

const DataStream = (props) =>{

  const { getHistory, action } = props;


  useEffect(() => {
    action.getHistory();
  })

  console.log(props)
  return (

    <>
    {/*historyh table*/}
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>Deal ID</th>
                <th>Deal Time</th>
                <th>Deal Counterparty ID</th>
                <th>Deal Instrument ID</th>
                <th>Deal Type</th>
                <th>Deal Amount</th>
                <th>Deal Quantity</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>int</td>
                <td>varchar</td>
                <td>int</td>
                <td>int</td>
                <td>char</td>
                <td>decimal</td>
                <td>int</td>
            </tr>

        </tbody>
    </Table>
    </>
  );
}

const mapStateToProps = ({ getHistory }) => {
  return {
    getHistory
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = {
    getHistory
  };
  return {
    action: bindActionCreators(actions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataStream)