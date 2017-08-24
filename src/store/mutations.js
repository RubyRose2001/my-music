import * as types from './mutation-types'
const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    },
    [types.SET_PlAYING](state, flag) {
        state.playing = flag
    },
    [types.SET_FULLSCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {
        state.playlist = list
    },
    [types.SET_SEQUENCELIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_MODE](state, list) {
        state.mode = list
    },
    [types.SET_CURRENTINDEX](state, num) {
        state.currentIndex = num
    },
    [types.SET_RANK](state, list) {
        state.rank = list
    },
    [types.SET_DISC](state, Disc) {
        state.disc = Disc
    },
    [types.SET_HISTORY](state, list) {
        state.searchHistory = list
    },
    [types.SET_PLAY_HISTORY](state, list) {
        state.playHistory = list
    },
    [types.SET_COLLECTION_SONG](state, song) {
        state.collectionSong = song
    },
}
export default mutations