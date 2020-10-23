import {call} from 'redux-saga/effects';
import {HOST_URL} from './path';
import axios from 'axios';


export default function* (url, method='GET', data=null) {
  const objectRequest = {
    method,
    url: `${HOST_URL}${url}`,
    data,
  }

  const response = yield call(axios, objectRequest)

  console.log(response)

  const responseBody = response.data

  return responseBody
}

