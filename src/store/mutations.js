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
    },
    [types.SET_PLAY_MODE](state, payload) {
        state.mode = payload
    },
    [types.SET_DISC](state, payload) {
        state.disc = payload
    },
    [types.SET_TOP_LIST](state, payload) {
        state.topList = payload
    },
    [types.SET_SCROLL_START](state, payload) {
        console.log('scrollstart');

        state.isScrollStart = payload
    }
}