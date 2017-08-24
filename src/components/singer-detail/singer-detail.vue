<template>
  <transition name="slide">
    <music-list :songs='songs' :bgImage='bgImage' :title='title'></music-list>>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import musicList from "../music-list/music-list"
  import {getSingerDetail} from "../../api/singer"
  import {createSong} from "../../common/js/song"
  import {ERR_OK} from '../../api/config'
  export default {
    data(){
      return {
        songs:null
      }
    },
    computed:{
      title() {
        return this.singer.name
      },
      bgImage() {
        return this.singer.avatar
      },
      ...mapGetters([
        'singer'
      ])
    },
    created(){
      this._fliterSongsData(this.singer)
    },
    methods:{
      _fliterSongsData(data){
        if(!data.mid){
          this.$router.push({
            path:"/singer"
          })
          return
        }
        getSingerDetail(data.mid).then((res)=>{
          if(res.code === ERR_OK) {
            this.songs=this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(o){
        let result = [];
        o.forEach((v,i)=>{
          result.push(createSong(v.musicData))
        })
        return result
      }
    },
    components:{
      musicList,
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
