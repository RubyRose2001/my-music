import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from './config'
import { setlist } from './ulit.js'
export const playMixin = {
    data() {
        return {
            flag: false
        }
    },
    computed: {
        ...mapGetters([
            'playlist',
            'playSong'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newlist) {
            if (newlist.length > 0) {
                this.handlePlaylist(newlist)
            }
        },
        playSong(song) {
            if (!song) this.handlePlaylist(this.playlist)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method')
        }
    }
}

export const playerMixin = {
    computed: {
        types() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters([
            'sequenceList',
            'mode',
            'playSong',
            'collectionSong'
        ])
    },
    methods: {
        toggleType() {
            let mode = (this.mode + 1) % 3
            this.setMode(mode)
            let item = null
            if (mode === playMode.random) {
                item = setlist(this.sequenceList)
            } else {
                item = this.sequenceList
            }
            this._serCurrent(item)
            this.setPlaylist(item)
        },
        _serCurrent(list) {
            if (!this.playSong) {
                return
            }
            let num = list.findIndex(x => {
                return x.id === this.playSong.id
            })
            this.setIndex(num)
        },
        addFavorite(song) {
            if (this.isFavorite(song)) {
                this.deleteCollectionSong(song)
            } else {
                this.addCollectionSong(song)
            }
        },
        toggleFavorite(song) {
            if (this.isFavorite(song)) {
                return 'icon-favorite'
            }
            return 'icon-not-favorite'
        },
        isFavorite(song) {
            let index = this.collectionSong.findIndex((item) => {
                return item.id === song.id
            })
            return index > -1
        },
        ...mapMutations({
            setMode: 'SET_MODE',
            setPlaylist: 'SET_PLAYLIST',
            setIndex: "SET_CURRENTINDEX"
        }),
        ...mapActions([
            'addCollectionSong',
            'deleteCollectionSong'
        ])
    }
}

export const searchMixin = {
    data() {
        return {
            query: ''
        }
    },
    methods: {
        saveSearch(data) {
            this.setHistory(this.query)
        },
        onQueryChange(query) {
            this.query = query
        },
        deleteOnly(index) {
            this.setdeleteOnly(index)
        },
        ...mapActions([
            'setHistory',
            "setdeleteOnly"
        ])
    }
}