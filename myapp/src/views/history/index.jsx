import React, { useState, useEffect } from 'react';
import { Container, Row, Table } from "react-bootstrap";
import { useObservable } from 'rxjs-hooks';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getHistory } from "../../store/actions";
import { default as LoadingScreen } from "../../components/index";

const DataStream = (props) => {

  const { getHistory, action } = props;


  useEffect(() => {
    if (getHistory.result === null) {
      action.getHistory();
    }

  }, [action.getHistory, getHistory.result])

  useEffect(() => {
    if (getHistory.result != null) {
      extractData(getHistory.result)
    }
  }, [getHistory.result, props])


  return getHistory.result != null ? (

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
          <Apis list={getHistory.result} />
        </tr>
        </tbody>
      </Table>
    </>) : <LoadingScreen />;

}

const Apis = props => <tbody>{props.list.map((item, i) => {
  return <tr><td key={item.deal_id}></td>
    <td>{item.deal_time}</td>
    <td>{item.deal_counterparty_id}</td>
    <td >{item.deal_instrument_id}</td>
    <td >{item.deal_type}</td>
    <td >{item.deal_amount}</td>
    <td >{item.deal_quantity}</td>
  </tr>
})}</tbody>;

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

const extractData = (data) => {
  console.log(data)
}

export default connect(mapStateToProps, mapDispatchToProps)(DataStream)