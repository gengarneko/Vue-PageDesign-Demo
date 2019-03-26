<template>
  <!-- 初始代码，我们注释掉 -->
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div> -->
  <!-- 我们的代码 -->
  <div id="appIndex">
    <div class="viewWrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus" src="/vue/vue-test/src/assets/stylus/main.styl"></style>

<style lang="stylus">
#appIndex
  min-width 1180px
  color #6E747D
  .viewWrap
    background-color $color-white
    // min-height calc(110vh - 110px)
    min-width 1170px
.fade-enter-active, .fade-leave-active
  transition opacity .3s
.fade-enter, .fade-leave-to
  opacity 0
</style>
