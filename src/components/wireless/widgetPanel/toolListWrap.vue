<template>
  <div id="tool-list">
    <div class="tool-content">
      <div class="tool-icon"><Icon type="md-images" /></div>
      <div class="tool-text"><span>图片模块</span></div>
      <div class="tool-number"><span>（1/10）</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolListWrap'
}
</script>

<style lang="stylus" scoped>
#tool-list
  padding 0 85px 0 65px
  .tool-content
    border-radius 8px
    margin-top 23px
    padding-bottom 7px
    display flex
    flex-direction column
    align-items center
    background-color #F5F5F5
    .tool-icon
      font-size 35px
    .tool-text
      font-size 14px
      color #7F8797
    .tool-number
      font-size 14px
      color #7F8797
    &:hover
      cursor pointer
      color #FF6700
      .tool-text,
      .tool-number
        color #FF6700
</style>
