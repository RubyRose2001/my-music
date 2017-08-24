<template>
  <div id="app">
    <m-header></m-header>
    <v-tab></v-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <v-play></v-play>
  </div>
</template>

<script>
  import MHeader from "./components/m-header/m-header"
  import Tab from "./components/tab/tab"
  import Player from "./components/player/player"
export default {
  name: 'app',
  components:{
    "m-header":MHeader,
    "v-tab":Tab,
    "v-play":Player
  }
}
</script>

<style>

</style>
