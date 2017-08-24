<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box @query = 'onQueryChange' ref='searchBox'></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <!--:refreshDelay="refreshDelay"   :data="shortcut" @click="showConfirm -->
      <scroll ref="shortcut" class="shortcut" :data="searchHistory">
        <div>
            <div>
                <div class="hot-key">
                  <h1 class="title">热门搜索</h1>
                  <ul>
                    <li class="item" @click=emitData(item.k) v-for="item in hotKey">
                      <span>{{item.k}}</span>
                    </li>
                  </ul>
                </div>
            </div>
            <div class="search-history">
              <h1 class="title">
                <span class="text">搜索历史</span>
                <span  class="clear" @click="clear()">
                  <i class="icon-clear"></i>
                </span>
              </h1> 
              <search-list ref="searchItem" v-show="searchHistory" :searches="searchHistory"
                @clickSearchHis="emitData"
                @clickDeleteHis="deleteOnly"
              ></search-list>
            </div>   
        </div>
      </scroll>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <div class="search-result" v-show="query" ref="searchResult">
       <suggest  @cookieData="saveSearch" ref="suggest" :query="query"></suggest> 
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getHot} from '../../api/search'
  import searchBox from '../../base/search-box/search-box'
  import searchList from '../../base/search-list/search-list'
  import Suggest from '../suggest/suggest'
  import Confirm from '../../base/confirm/confirm'
  import {ERR_OK} from '../../api/config'
  import {playMixin,searchMixin} from '../../common/js/mixin'
  import {mapGetters,mapActions} from 'vuex'
  import Scroll from '../../base/scroll/scroll'
  export default {
    mixins:[playMixin,searchMixin],
    data() {
      return {
        hotKey:[]
      }
    },
    created(){
      this._getHot()
    },
    computed:{
      ...mapGetters([
        'searchHistory'
      ])
    },
    methods:{
      clearSearchHistory(){
        this.removeCookie()
      },
      handlePlaylist(playlist){
        let bottom = playlist.length > 0 ? '60px' : '';
        this.$refs.shortcutWrapper.style.bottom = bottom;
        this.$refs.searchResult.style.bottom = bottom;
        this.$refs.shortcut.refresh()
        this.$refs.suggest.refresh()
      },
      clear(){
        this.$refs.confirm.show()
      },
      _getHot() {
        getHot().then(res => {
          if(ERR_OK === res.code) {
            this.hotKey = this._setArr(res.data.hotkey)
          }
        })
      },
      _setArr(list) {
        let ret = []
        list.forEach((v,i) => {
          if(i>10) return 
          ret.push(v)
        })
        return ret
      },
      emitData(val) {
        this.$refs.searchBox.setQuery(val)
      },
      ...mapActions([
        'insertSong',
        'removeCookie'
      ])
    },
     watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    components: {
      searchBox,
      searchList,
      Suggest,
      Scroll,
      Confirm
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .histroy
            height :280px
            overflow :hidden
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
