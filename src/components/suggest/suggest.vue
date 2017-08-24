<template>
  <scroll ref="suggest" class="suggest"  :data='result' 
    :pullup='pullup'
    @scrollToEnd='scrollToEnd'
  >
    <ul class="suggest-list" ref="suggestList">
      <li class="suggest-item" v-for="item in result" @click='selectItem(item)'>
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
           <p class="text" v-html="getDisplayName(item)"></p> 
        </div>
      </li>
       <loading v-show="hasMore" title=""></loading> 
    </ul>
     <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div> 
  </scroll>
</template>

 <script type="text/ecmascript-6">
  import {getSearchData} from '../../api/search'
  import {mapActions,mapMutations} from 'vuex'
  import {createSong} from '../../common/js/song'
  import Scroll from '../../base/scroll/scroll'
  import noResult from '../../base/no-result/no-result'
  import Loading from '../../base/loading/loading'
  import Singer from '../../common/js/singer'
  

  const TYPE_SINGER = 'singer'
  const perpage = 20
  export default {
    props: {
      query: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        page: 1,
        result: null,
        hasMore: true,
        pullup:true
      }
    },
    methods:{
      refresh(){
        this.$refs.suggest.refresh()
      },
      searchData() {
        if(!this.query){ 
          this.result=[]
          return
        }
        this.page = 1
        this.hasMore=true
        this.$refs.suggest.scrollTo(0,0)
        getSearchData(this.query,this.page,perpage).then(res => {
          this.result=this._genResult(res.data)
          this._checkMore(res.data)
        })
      },
      _checkMore(data) {
        const song = data.song
        if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
          this.hasMore = false
        }
      },
      _genResult(data) {
        let ret = []
        if (data.zhida && data.zhida.singerid) {
          ret.push({...data.zhida, ...{type: TYPE_SINGER}})
        }
        if (data.song) {
          ret = ret.concat(this._normalizeSongs(data.song.list))
        }
        return ret
      },
      getDisplayName(item) {
        if (item.type === TYPE_SINGER) {
          return item.singername
        } else {
          return `${item.name}-${item.singer}`
        }
      },
      getIconCls(item) {
        if (item.type === TYPE_SINGER) {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((musicData) => {
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      },
      scrollToEnd() {
        if(!this.hasMore) return 
        this.page = this.page+1
        getSearchData(this.query,this.page,perpage).then(res => {
          this.result=this.result.concat(this._genResult(res.data))
        })
      },
      selectItem(item){
        if (item.type === TYPE_SINGER) {
          const singer = new Singer({
            id: item.singermid,
            name: item.singername
          })
          this.$router.push({
            path:`search/${singer.mid}`
          })
          this.setSonger(singer)
        }else{
          this.insertSong(item)
        }
        this.$emit('cookieData',item)
      },
      ...mapMutations({
        setSonger:'SET_SINGER'
      }),
      ...mapActions([
        'insertSong',
      ])
    },
    watch:{
      query(){
        this.searchData()
      }
    },
    components:{
      Scroll,
      Loading,
      noResult,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>