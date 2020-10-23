import {GET_HISTORY} from './action-types'
export const getHistory = (credentials) => {
    return {
        type: getHistory,
        payload: credentials
    }
}
