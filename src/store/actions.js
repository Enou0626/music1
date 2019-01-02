import * as type from "./mutation-types";
import { playMode } from "common/js/config";
import { shuffle } from "common/js/util";
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
    }
}