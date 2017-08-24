<template>
  <scroll class="listview"
          :data="data"
          ref="listview"
          :probeType=3
          :listenScroll=true
          @iscroll="scorll"
  >
    <ul ref="list">
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title" ref="listGroups">{{group.type}}</h2>
        <ul>
          <li  v-for="item in group.newArr" @click="selectItem(item)" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" v-show="shortcutList">
      <ul>
        <li v-for="(item, index) in shortcutList" :class="{'current':currentIndex===index}" class="item" @touchstart.stop.prevent="touchstrat($event,index)" @touchmove.stop.prevent="touchmove($event)" >{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle" v-if="data">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>
<script type="text/ecmascript-6">
  import Scroll from '../../base/scroll/scroll'
  import Loading from '../../base/loading/loading'


  //右侧快捷入口高度
  const ANCHOR_HEIGHT = 16
  const TITLE_HEIGHT = 30
  export default {

    data(){
      return {
        scrollY:-1,
        currentIndex:0,
        diff:-1
      }
    },
    props:{
        data:{
          type:Array,
          default:[]
        }
    },
    created(){
      this.page={}
      this.listHeight=[]
    },
    methods:{
      //右侧快捷入口定位到左侧
      toElment(index){
        if(index<0 || index>this.$refs.listGroup.length-1) return;
        this.$refs.listview.scrollElement(this.$refs.listGroup[index],0)
        this.currentIndex=index
      },
      //右侧快捷入口滑动定位到左侧
      touchstrat(e,index){
        this.toElment(index)
        this.page.index=index;
        this.page.startY=e.changedTouches[0].clientY;
      },
      touchmove(e){
        this.page.moveY=e.changedTouches[0].clientY;
        this.page.result=Math.floor((this.page.moveY-this.page.startY)/ANCHOR_HEIGHT)+this.page.index;
        this.toElment(this.page.result)
      },
      //获取listGroup offsetTop
      _calculateHeight(){
        const list=this.$refs.listGroups;
        for(var i=0;i<list.length;i++){
          this.listHeight.push(list[i].offsetTop)
        }
      },
      //滚轮接收
      scorll(pos){
        this.scrollY=pos.y
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      selectItem(curData){
        this.$emit("select",curData)
      }
    },
    computed:{
      shortcutList(){
          let arr=[];
          for(var i in this.data){
            arr.push(this.data[i].type.substring(0,1))
          }
          return arr
      },
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].type : ''
      }
    },
    components:{
      Scroll,
      Loading,
    },
    watch:{
      data(){
         setTimeout(()=>{
           this._calculateHeight()
         },20)
      },
      //监听@emit派送过来的值
      scrollY(y){
        for(var i=0;i<this.listHeight.length;i++){
          let height2=this.listHeight[i]
          if(y>0) return ;
          if(Math.abs(y)<=this.listHeight[i]){
            this.currentIndex=this.currentIndex<=0 ? 0 : i-1
            this.diff=height2+y
            return false
          }else{
            this.diff=height2+y
            this.currentIndex=this.listHeight.length-1
          }
        }
      },
      //标题下限监听
      diff(y){
          let  fixedTop=(y > 0 && y < TITLE_HEIGHT) ? y-TITLE_HEIGHT+2 : 0
          this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 10px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 2px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: -1px
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
