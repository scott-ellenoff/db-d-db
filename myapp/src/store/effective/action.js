import {LOGIN} from './action-types'
export const login = (credentials) => {
    return {
        type: LOGIN,
        payload: credentials
    }
}
