import * as types from './mutation-types'
import { setlist } from '../common/js/ulit'
import { playMode } from '../common/js/config'

import { setCookie, deleteOnly, removeAll, setPlayHistory, addCollection, deletCollection } from '../common/js/cookie'
export const selectPlay = function({ commit, state }, { list, index }) {
    let changeArr = null,
        cur = 0;
    if (state.mode === playMode.random) {
        changeArr = setlist(list)
        cur = findindex(changeArr, list[index])
    } else {
        changeArr = list
        cur = index
    }
    commit(types.SET_SEQUENCELIST, list)
    commit(types.SET_PLAYLIST, changeArr)
    commit(types.SET_CURRENTINDEX, cur)
    commit(types.SET_PlAYING, true)
    commit(types.SET_FULLSCREEN, true)

}
export const setRandom = function({ commit }, { list }) {
    commit(types.SET_SEQUENCELIST, list)
    let changeArr = setlist(list)
    commit(types.SET_PLAYLIST, changeArr)
    commit(types.SET_CURRENTINDEX, 0)
    commit(types.SET_MODE, playMode.random)
    commit(types.SET_PlAYING, true)
    commit(types.SET_FULLSCREEN, true)
}
export const insertSong = function({ commit, state }, song) {
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
        // 记录当前歌曲
    let currentSong = playlist[currentIndex]
        // 查找当前列表中是否有待插入的歌曲并返回其索引
    let fpIndex = findindex(playlist, song)
        // 因为是插入歌曲，所以索引+1
    currentIndex++
    // 插入这首歌到当前索引位置
    playlist.splice(currentIndex, 0, song)
        // 如果已经包含了这首歌
    if (fpIndex > -1) {
        // 如果当前插入的序号大于列表中的序号
        if (currentIndex > fpIndex) {
            playlist.splice(fpIndex, 1)
            currentIndex--
        } else {
            playlist.splice(fpIndex + 1, 1)
        }
    }

    let currentSIndex = findindex(sequenceList, currentSong) + 1

    let fsIndex = findindex(sequenceList, song)

    sequenceList.splice(currentSIndex, 0, song)

    if (fsIndex > -1) {
        if (currentSIndex > fsIndex) {
            sequenceList.splice(fsIndex, 1)
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }

    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCELIST, sequenceList)
    commit(types.SET_CURRENTINDEX, currentIndex)
    commit(types.SET_FULLSCREEN, true)
    commit(types.SET_PlAYING, true)
}
export const deleteSong = function({ commit, state }, item) {
    let currentSindex = state.currentIndex
    let setPlaylist = [...state.playlist]
    let setsequenceList = [...state.sequenceList]
    const listIndex = findindex(setPlaylist, item)
    setPlaylist.splice(listIndex, 1)
    console.log(listIndex)
    let sequenceListIndex = findindex(setsequenceList, item)
    setsequenceList.splice(sequenceListIndex, 1)
    if (listIndex < currentSindex) {
        console.log(listIndex, currentSindex)
        currentSindex--
    }
    commit(types.SET_SEQUENCELIST, setsequenceList)
    commit(types.SET_PLAYLIST, setPlaylist)
    commit(types.SET_CURRENTINDEX, currentSindex)
}
export const setHistory = function({ commit, state }, item) {
    let cookie = setCookie(item)
    commit(types.SET_HISTORY, cookie)
}
export const setdeleteOnly = function({ commit, state }, index) {
    let cookie = deleteOnly(index)
    commit(types.SET_HISTORY, cookie)
}
export const removeCookie = function({ commit, state }) {
    let cookie = removeAll()
    commit(types.SET_HISTORY, cookie)
}

export const removePlaylist = function({ commit, state }) {
    commit(types.SET_SEQUENCELIST, [])
    commit(types.SET_PLAYLIST, [])
    commit(types.SET_CURRENTINDEX, -1)
    commit(types.SET_PlAYING, false)
    commit(types.SET_FULLSCREEN, false)
}

export const insertPlayHistory = function({ commit, state }, item) {
    let cookie = setPlayHistory(item)
    commit(types.SET_PLAY_HISTORY, cookie)
}

export const addCollectionSong = function({ commit, state }, item) {
    let cookie = addCollection(item)
    commit(types.SET_COLLECTION_SONG, cookie)
}

export const deleteCollectionSong = function({ commit, state }, item) {
    let index = findindex(state.collectionSong, item)
    let cookie = deletCollection(index)
    commit(types.SET_COLLECTION_SONG, cookie)
}

function findindex(item, song) {
    var num = item.findIndex(a => {
        return a.id === song.id
    })
    return num
}