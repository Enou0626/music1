import * as type from "./mutation-types";
export default {
    selectSong({ commit }, { songs, index }) {
        console.log(songs);
        commit(type.SET_PLAYING_STATE, true);
        commit(type.SET_FULL_SCREEN, true);
        commit(type.SET_PLAYLIST, songs);
        commit(type.SET_SEQUENCE_LIST, songs);
        commit(type.SET_CURRENT_INDEX, index);
    }
}