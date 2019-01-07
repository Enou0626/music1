import { playMode } from 'common/js/config'
// import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'
export default {
    singer: {},
    playing: false,
    fullScreen: false,
    playList: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    disc: {},
    topList: {},
    isScrollStart: false
    // searchHistory: loadSearch(),
    // playHistory: loadPlay(),
    // favoriteList: loadFavorite()
}