<template>
  <div id="shortcut-list">
    <div class="list-title">
      快捷键
    </div>
    <div class="list-item">
      <div class="item-title">复制</div>
      <div class="item-content"><span>Ctrl</span> + <span class="last">C</span></div>
    </div>
    <div class="list-item">
      <div class="item-title">粘贴</div>
      <div class="item-content"><span>Ctrl</span> + <span class="last">V</span></div>
    </div>
    <div class="list-item">
      <div class="item-title">删除</div>
      <div class="item-content"><span>Ctrl</span> + <span class="last">D</span></div>
    </div>
    <div class="list-item">
      <div class="item-title">移动（1 像素）</div>
      <div class="item-content"><span>Ctrl</span> + <span class="last">M</span></div>
    </div>
    <div class="list-item">
      <div class="item-title">移动</div>
      <div class="item-content"><span>Ctrl</span> + <span class="last">任意</span></div>
    </div>
    <div class="list-item">
      <div class="item-title">快速热点</div>
      <div class="item-content"><span>Ctrl</span> + <span class="last">C</span></div>
    </div>
    <div class="list-item">
      <div class="item-title">撤销</div>
      <div class="item-content"><span>Ctrl</span> + <span class="last">C</span></div>
    </div>
    <div class="list-item">
      <div class="item-title">恢复</div>
      <div class="item-content"><span>Ctrl</span> + <span class="last">C</span></div>
    </div>
    <div class="list-item">
      <div class="item-title">测试</div>
      <div class="item-content"><span>Delete</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShortcutListWrap'
}
</script>

<style lang="stylus">
#shortcut-list
  padding 25px 23px
  .list-title
    color #333333
    font-size 16px
    font-weight:bold
  .list-item
    border-bottom 1px solid #E6E6E6
    padding 15px 0 19px 0
    box-sizing border-box
    display flex
    font-size 13px
    color #666666
    .item-title
      flex 1
    .item-content
      flex 1
      display flex
      justify-content flex-start
      span
        background #EFF2F7
        color #000000
        font-family OpenSans
        border-radius 2px
        min-width 36px
        padding 0 5px
        display block
        text-align center
        margin 0 8px
        &.last
          margin-right 0
</style>
