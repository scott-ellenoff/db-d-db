import {SERVER_ACTIVE} from './action-types'
export const serverActive = (data) => {
    return {
        type: SERVER_ACTIVE,
        payload: data
    }
}
