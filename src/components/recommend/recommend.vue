<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="list">
      <div>
        <div class="" v-if="sliderData">
          <!--轮播图-->
          <slider ref="recommendSlide">
            <div v-for="(v,i) in sliderData" class="swiper-slide">
              <a :href="v.linkUrl">
                <img class="needsclick" @load="imgLoad" :src="v.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(v,i) in list" class="item" @click="selectItem(v)">
              <div class="icon">
                <img width="60" height="60"  v-lazy="v.imgurl">
              </div>
              <div class="text">
                <h2 class="name" v-html="v.creator.name"></h2>
                <p class="desc" v-html="v.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!list">
        <loading></loading>
      </div>
      <router-view></router-view>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getRecommend,getList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config.js'
  import Slider from '../../base/slider/slider'
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'
  import {playMixin} from '../../common/js/mixin'
  import Disc from '../disc/disc'
  import {mapMutations} from 'vuex'
  export default {
    mixins:[playMixin],
    data(){
      return {
        sliderData:null,
        list:null
      }
    },
    created(){
      this.$nextTick(()=>{
        this._getcommend()
        this._getAllList()
      })
    },
    methods:{
      _getcommend(){
        getRecommend().then((res)=>{
          if(res.code===ERR_OK){
            this.sliderData=res.data.slider
          }
        })
      },
      _getAllList(){
        getList().then((res)=>{
          if(res.code===ERR_OK){
            this.list=res.data.list
          }
        })
      },
      imgLoad(){
          if(!this.flag){
            this.flag=true
            setTimeout(()=>{
              this.$refs.scroll.refresh()
            },20)
          }
      },
      handlePlaylist(playlist){
        let bottom = playlist.length > 0 ? '60px' : '';
        this.$refs.recommend.style.bottom = bottom;
        this.$refs.scroll.refresh()
      },
      selectItem(item) {
        this.setDisc(item)
        this.$router.push({
          path:`recommend/${item.dissid}`,
          template:Disc
        })
      },
      ...mapMutations({
          setDisc:'SET_DISC'
      })
    },
    components:{
      Slider,
      Scroll,
      Loading,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .swiper-slide
        width:100%
        img
          display:block
          width:100%
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)


</style>
