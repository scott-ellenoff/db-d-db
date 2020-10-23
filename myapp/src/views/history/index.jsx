import React, { useState } from 'react';
import { Container, Row, Table } from "react-bootstrap";
import { useObservable } from 'rxjs-hooks';
import { Observable } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';
import login from '../../utils/path';

const stringObservable = Observable.create(observer => {
  const source = new EventSource(login);
  source.addEventListener('message', (messageEvent) => {
    console.log(messageEvent);
    observer.next(messageEvent.data);
  }, false);
});

const DataStream = () =>{
  const [stringArray, setStringArray] = useState([]);

  useObservable(
    state =>
      stringObservable.pipe(
        withLatestFrom(state),
        map(([state]) => {
          let updatedStringArray = stringArray;
          updatedStringArray.unshift(state);
          if (updatedStringArray.length >= 50) {
            updatedStringArray.pop();
          }
          setStringArray(updatedStringArray);
          return state;
        })
      )
  );

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
      {stringArray ? stringArray.map((message, index) => <p key={index}>{message}</p>) : <p>Loading...</p>}
    </>
  );
}

export default DataStream