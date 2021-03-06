import * as type from "./mutation-types";
import { playMode } from "common/js/config";
import { shuffle } from "common/js/util";
import { saveSearch, clearSearch, deleteSearch } from "common/js/cache"

function spliceList(playList, item, currentIndex) {
    const sameIndex = playList.findIndex((song) => {
        return song.songmid === item.songmid
    })
    playList.splice(currentIndex, 0, item);
    if (sameIndex > -1) {
        if (sameIndex > currentIndex) { // 删除点在插入点之后
            playList.splice(sameIndex, 1)
            // console.log('after');
        } else { // 删除点在插入点之前
            playList.splice(sameIndex, 1);
            currentIndex = currentIndex--;
            // console.log('before');
        }
    }

    return currentIndex
}

export default {
    selectSong({ commit, state }, { songs, index }) {
        commit(type.SET_SEQUENCE_LIST, songs);
        commit(type.SET_PLAYLIST, shuffle(songs));

        if (state.mode === playMode.random) {
            let randomIndex = state.playList.findIndex((item) => {
                return item.id === state.sequenceList[index].id;
            });
            commit(type.SET_CURRENT_INDEX, randomIndex);
        } else {
            commit(type.SET_PLAYLIST, songs);
            commit(type.SET_CURRENT_INDEX, index);
            commit(type.SET_SEQUENCE_LIST, songs);
        }
        commit(type.SET_PLAYING_STATE, true);
        commit(type.SET_FULL_SCREEN, true);
    },
    randomPlay({ commit }, songs) {
        commit(type.SET_PLAYLIST, shuffle(songs));
        commit(type.SET_SEQUENCE_LIST, songs);
        commit(type.SET_PLAY_MODE, playMode.random);
        commit(type.SET_CURRENT_INDEX, 0);
        commit(type.SET_FULL_SCREEN, true);
        commit(type.SET_PLAYING_STATE, true);
    },
    querySelect({ commit, state }, item) {
        let playList = state.playList.slice();
        let sequenceList = state.sequenceList.slice();
        let currentIndex = state.currentIndex + 1;
        currentIndex = spliceList(playList, item, currentIndex);
        spliceList(sequenceList, item, currentIndex);

        commit(type.SET_CURRENT_INDEX, currentIndex);
        commit(type.SET_PLAYLIST, playList);
        commit(type.SET_SEQUENCE_LIST, playList);
        commit(type.SET_FULL_SCREEN, true);
        commit(type.SET_PLAYING_STATE, true);
    },
    addQueryHistory({ commit, state }, item) {
        const list = saveSearch(item)
        commit(type.SET_SEARCH_HISTORY, list)
    },
    clearSearchHistory({ commit, state }, item) {
        const list = clearSearch()
        commit(type.SET_SEARCH_HISTORY, list)
    },
    deleteSearchItem({ commit }, item) {
        const list = deleteSearch(item);
        commit(type.SET_SEARCH_HISTORY, list)
    }
}