import { playMode } from '../common/js/config'
import { getCookie, loadPlayHistory, initCollection } from '../common/js/cookie'

const state = {
    rank: {}, //rank数据
    disc: {}, //推荐数据
    singer: {}, //歌手数据
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    searchHistory: getCookie(),
    playHistory: loadPlayHistory(),
    collectionSong: initCollection()
}
export default state