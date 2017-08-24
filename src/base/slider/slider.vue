<template>
  <div class="slider swiper-container" ref="slider">
    <div class="slider-group swiper-wrapper"  ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="swiper-pagination">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper'
  export default {
    data(){
        return {
          slider:null
        }
    },
    props:{
      loop:{
        type:Boolean,
        default:true
      },
      autoPlay: {
        type: Number,
        default: 2000
      }
    },
    mounted(){
      this.$nextTick(function () {
        // DOM 更新了
      })
      setTimeout(()=>{
        //设置轮播的图的宽度
        this._setSliderWidth()
        //配置swiper
        this._initSlider()
      },20)
    },
    methods:{
      //设置轮播的图的宽度
      _setSliderWidth(isResize){
        let children=this.$refs.sliderGroup.children;
        let slider =this.$refs.slider.clientWidth;
        let le=children.length
        if(this.loop){
          le=children.length+2
        }
        for(var i=0; i<children.length;i++){
          children[i].style.width=1/le*100+"%";
          children[i].classList.add("slider-item")
        }
        this.$refs.sliderGroup.style.width=le+"00%"
      },
      //配置swiper
      _initSlider(){
        this.slider = new Swiper(this.$refs.slider, {
          loop:this.loop,
          autoplay:this.autoPlay,
          autoplayDisableOnInteraction: false,
          pagination: '.swiper-pagination',
          paginationType: 'bullets',
          paginationClickable:'true'
        })
      },

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .slider
    min-height: 1px
    position:relative
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width:100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
