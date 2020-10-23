import React, { useState } from 'react';
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
      {stringArray ? stringArray.map((message, index) => <p key={index}>{message}</p>) : <p>Loading...</p>}
    </>
  );
}

export default DataStream;