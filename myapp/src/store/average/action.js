import {GET_AVERAGE} from './action-types'
export const getAverage = (credentials) => {
    return {
        type: GET_AVERAGE,
        payload: credentials
    }
}
