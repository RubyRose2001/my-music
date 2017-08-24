<template>
  <div class="progress-bar" ref="progressBar" @click="tick($event)">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
         @touchstart.stop.prevent="progressTouchStart"
         @touchmove.stop.prevent="progressTouchMove"
         @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const progressBtnWidth = 16
  export default {
    props: {
      percent: {
        type: Number,
        default: 0
      }
    },
    created(){
        this.flag = false
        this.page = {}
    },
    methods:{
      progressTouchStart(event) {
        this.flag = true
        this.page.startX = event.changedTouches[0].pageX;
        this.page.offsetLeft = this.$refs.progress.clientWidth
      },
      progressTouchMove(event) {
        this.page.resultX =  event.changedTouches[0].pageX - this.page.startX+this.page.offsetLeft
        let endX = Math.min(this.$refs.progressBar.clientWidth ,Math.max(0,this.page.resultX))
        this._offset(endX)
      },
      progressTouchEnd() {
        this.flag = false
        //比例
        let bl = this.$refs.progress.clientWidth/ (this.$refs.progressBar.clientWidth-progressBtnWidth)
        this.$emit("bl",bl)
      },
      tick(event) {
        let offsetL=event.offsetX;
        let bl = offsetL / (this.$refs.progressBar.clientWidth-progressBtnWidth)
        this.$emit("bl",bl)
      },
      _offset(offsetLeft){
        this.$refs.progress.style.width= `${offsetLeft}px`;
        this.$refs.progressBtn.style.transform= `translate3d(${offsetLeft}px,0,0)`
      }
    },
    watch: {
      percent(e){
        if(e>=0 && !this.flag){
          let allWidth = this.$refs.progressBar.clientWidth-progressBtnWidth;
          let offsetLeft =  allWidth * e
          this._offset(offsetLeft)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
