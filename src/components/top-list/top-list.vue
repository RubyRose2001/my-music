<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs" :ranks="ranks"></music-list>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MusicList from '../music-list/music-list'
  import {getMusicList} from '../../api/rank'
  import {ERR_OK} from '../../api/config'
  import {mapGetters} from 'vuex'
  import {createSong} from '../../common/js/song'

    export default {
      data(){
        return {
          ranks:true,
          songs:[]
        }
      },
      computed:{
        title() {
          return this.rank.topTitle
        },
        bgImage() {
          return this.rank.picUrl
        },
        ...mapGetters([
          'rank'
        ])
      },
      created(){
        this._getMusicData()
      },
      methods: {
        _getMusicData() {
          if(!this.rank.id){
            this.$router.push({
              path:"/rank"
            })
            return
          }
          getMusicList(this.rank.id).then(res => {
              this.songs = this._normalizeSongs(res.songlist)
          })
        },
        _normalizeSongs(list){
            let ret =[]
            list.forEach(item => {
              if(item.data.songid && item.data.songmid){
                ret.push(createSong(item.data))
              }
            })
          console.log(ret)
          return ret
        }
      },
      components: {
        MusicList,
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
