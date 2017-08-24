<template>
  <div class="singer" ref="singer">
    <listview :data="singers" @select="select" ref="list"></listview>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import Listview from "../../base/listview/listview"
  import {getSinger} from '../../api/singer'
  import {ERR_OK} from "../../api/config"
  import {mapMutations} from 'vuex'
  import {playMixin} from '../../common/js/mixin'
  const SINGHOT_LENGH=10
  const HOT_NAME = '热门'
  export default{
    mixins:[playMixin],
    data(){
        return {
          singers:null
        }
    },
    created(){
      this._singerInitData()
    },
    methods:{
      handlePlaylist(playlist){
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      _singerInitData(){
        getSinger().then((res)=>{
          this.initData=res.data.list
          this.singers=this.sort(this.initData)
        })
      },
      sort(initData){
        let sortInitData={
          hot:{
            type:"热门",
            newArr:[]
          }
        }
        initData.forEach((v,i)=>{
          let key=v.Findex
          if(i<SINGHOT_LENGH){
            sortInitData.hot.newArr.push({
              name:v.Fsinger_name,
              mid:v.Fsinger_mid,

              avatar:`http://y.gtimg.cn/music/photo_new/T001R150x150M000${v.Fsinger_mid}.jpg?max_age=2592000`
            })
          }else{
            if(!sortInitData[key]){
              sortInitData[key]={
                type:key,
                newArr:[]
              }
            }
            sortInitData[key].newArr.push({
              name:v.Fsinger_name,
              mid:v.Fsinger_mid,
              avatar:`http://y.gtimg.cn/music/photo_new/T001R150x150M000${v.Fsinger_mid}.jpg?max_age=2592000`
            })
          }
        })
        // 为了得到有序列表，我们需要处理 sortInitData
        let ret = []
        let hot = []
        for(var i in sortInitData){
          if(sortInitData[i].type.match(/[a-zA-Z]/)){
            ret.push(sortInitData[i])
          }else if(sortInitData[i].type === HOT_NAME){
            hot.push(sortInitData[i])
          }
        }
        ret.sort((a, b) => {
          return a.type.charCodeAt(0) - b.type.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      select(data){
        this.$router.push({
          path:`/singer/${data.mid}`
        })
        this.setSinger(data)
      },
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
    },
    components:{
      Listview,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
