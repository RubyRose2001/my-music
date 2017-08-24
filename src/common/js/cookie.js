import storage from 'good-storage'

const COOKIE_NAME = '__story__'
const COOKIE_LEN = 15

const COOKIE_PLAY = '__play__'
const COOKIE_PLAY_LEN = 200

const COOKIE_ADD_COLLECTION_SONG = '__collection__'
const COOKIE_ADD_COLLECTION_SONG_LEN = 200
    //添加cookie
function setval(history, item, commits, len) {
    var index = history.findIndex(commits)
    if (index === 0) {
        return
    }
    if (index > 0) {
        history.splice(index, 1)
    }
    history.unshift(item)
    if (len && history.length > len) {
        history.pop()
    }
}
export const setCookie = function(item) {
        // storage.remove(COOKIE_NAME)
        let setHistory = storage.get(COOKIE_NAME, [])
        setval(setHistory, item, (i) => {
            return i == item
        }, COOKIE_LEN)
        let history = storage.set(COOKIE_NAME, setHistory)
        return setHistory
    }
    //页面初始化获取cookie
export const getCookie = function() {
    return storage.get(COOKIE_NAME, [])
}

//删除单条cookie
export const deleteOnly = function(item) {
        let setHistory = storage.get(COOKIE_NAME, [])
        setHistory.splice(item, 1)
        storage.set(COOKIE_NAME, setHistory)
        return setHistory
    }
    //删除全部cookie
export const removeAll = function() {
    storage.remove(COOKIE_NAME)
    return []
}

//保存播放历史

export const setPlayHistory = function(item) {
    let setPlayHistory = storage.get(COOKIE_PLAY, [])
    setval(setPlayHistory, item, (i) => {
        return i.id == item.id
    }, COOKIE_PLAY_LEN)
    storage.set(COOKIE_PLAY, setPlayHistory)
    return setPlayHistory
}

//初始加载播放历史
export const loadPlayHistory = function() {
        return storage.get(COOKIE_PLAY, [])
    }
    //添加收藏

export const addCollection = function(item) {
    let setHistory = storage.get(COOKIE_ADD_COLLECTION_SONG, [])
    setval(setHistory, item, (i) => {
        return i.id == item.id
    }, COOKIE_ADD_COLLECTION_SONG_LEN)
    storage.set(COOKIE_ADD_COLLECTION_SONG, setHistory)
    return setHistory
}

export const deletCollection = function(index) {
    let setHistory = storage.get(COOKIE_ADD_COLLECTION_SONG, [])
    setHistory.splice(index, 1)
    storage.set(COOKIE_ADD_COLLECTION_SONG, setHistory)
    return setHistory
}
export const initCollection = function() {
    return storage.get(COOKIE_ADD_COLLECTION_SONG, [])
}