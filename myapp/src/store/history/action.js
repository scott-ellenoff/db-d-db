import {GET_HISTORY} from './action-types'
export const getHistory = (credentials) => {
    console.log('hello')
    return {
        type: GET_HISTORY,
        payload: credentials
    }
}
