import {GET_REALIZED} from './action-types'
export const getRealized = (credentials) => {
    return {
        type: GET_REALIZED,
        payload: credentials
    }
}
