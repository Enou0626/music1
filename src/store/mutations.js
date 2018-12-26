import * as types from './mutation-types'
export default {
    [types.SET_SINGER](state, payload) {
        state.singer = payload
    },
    [types.SET_PLAYLIST](state, payload) {
        state.playlist = payload
    }
}