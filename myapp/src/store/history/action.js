import {GET_HISTORY} from './action-types'
export const getHistory = (credentials) => {
    return {
        type: GET_HISTORY,
        payload: credentials
    }
}
