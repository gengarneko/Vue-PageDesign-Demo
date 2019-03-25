<template>
  <div id="tech-list">
    <!-- 黑科技列表 -->
    <div
      class="tech-btn"
      v-for="(item, index) in techList"
      :key="index"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TechListWrap',
  data () {
    return {
      techList: [
        {
          text: '淘宝链接转换工具'
        },
        {
          text: '无线 GIF 功能'
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
#tech-list
  padding 25px
  .tech-btn
    height 48px
    width 200px
    display flex
    align-items center
    justify-content center
    background white
    box-sizing border-box
    border-radius 4px
    border 1px solid #DDDDDD
    margin 23px 0
    cursor pointer
    color #666666
    &:hover
      color #FF6700
      border 1px solid #FF6700
  .tech-btn:first-child
    margin-top 0
  .tech-btn:last-child
    margin-bottom 0
</style>
