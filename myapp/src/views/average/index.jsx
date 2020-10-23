import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import {default as LoadingScreen} from "../../components/index";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getAverage } from "../../store/actions";

const AvgTable = (props) =>{

    const {action, getAverage} = props

    useEffect(()=>{
        if (getAverage.result == null) action.getAverage()
    }
)

    return getAverage.result != null ? (
    <Table striped bordered hover>
        <thead>
            <tr>
                <th>Instrument Name</th>
                <th>Average Buy Price</th>
                <th>Average Sell Price</th>
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
    ) : <LoadingScreen />;
}

const mapStateToProps = ({ getAverage }) => {
    return {
        getAverage,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    const actions = {
        getAverage,
    };
    return {
      action: bindActionCreators(actions, dispatch),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(AvgTable);