import * as types from './mutation-types'
export default {
    [types.SET_SINGER](state, payload) {
        state.singer = payload
    },
    [types.SET_PLAYLIST](state, payload) {
        state.playList = payload
    },
    [types.SET_PLAYING_STATE](state, payload) {
        state.playing = payload
    },
    [types.SET_SEQUENCE_LIST](state, payload) {
        state.sequenceList = payload
    },
    [types.SET_FULL_SCREEN](state, payload) {
        state.fullScreen = payload
    },
    [types.SET_CURRENT_INDEX](state, payload) {
        state.currentIndex = payload
    }
}