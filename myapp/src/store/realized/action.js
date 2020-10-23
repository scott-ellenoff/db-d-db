import {GET_EFFECTIVE} from './action-types'
export const getEffective = (credentials) => {
    return {
        type: GET_EFFECTIVE,
        payload: credentials
    }
}
