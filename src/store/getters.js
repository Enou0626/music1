
export default {
    singer(state) { return state.singer },
    currentSong(state) { return state.playList[state.currentIndex] || [] }
}