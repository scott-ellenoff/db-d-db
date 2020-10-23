import {GET_END_POSITIONS} from './action-types'
export const getEndPosition = (credentials) => {
    return {
        type: GET_END_POSITIONS,
        payload: credentials
    }
}
