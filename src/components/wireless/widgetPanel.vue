<template>
  <div id="widget-panel">
    <div class="widget-menu">
      <!-- 菜单按钮组 -->
      <div
        class="widget-item"
        :class="{ 'active': activeWidgetClassify === index }"
        v-for="(item, index) in widgetItems"
        :key="index"
        @click="clickItem(index)"
      >
        <Icon :type="item.icon" size="24"/>
        <div class="item-name">{{ item.name }}</div>
      </div>
      <!-- 工具按钮组 -->
      <div class="item-btns">
        <Icon
          class="item-btn"
          :class="{ 'active': activeWidgetClassify === 3 }"
          type="md-help-circle"
          size="24"
          @click="clickItem(3)"
        />
        <Icon
          class="item-btn"
          :class="{ 'active': activeWidgetClassify === 4 }"
          type="md-keypad"
          size="24"
          @click="clickItem(4)"/>
          <Icon
            class="item-btn"
            :class="{ 'active': activeWidgetClassify === 5 }"
            type="md-close-circle"
            size="24"
            @click="clickItem(-1)"/>
      </div>
    </div>
    <div class="widget-wrap" v-if="showWrap">
      <!-- 工具类 -->
      <tool-list-wrap v-if="showItems[0].show" :style="getStyle(0)"/>
      <!-- 黑科技 -->
      <tech-list-wrap v-if="showItems[1].show" :style="getStyle(1)"/>
      <!-- 爱分享 -->
      <share-list-wrap v-if="showItems[2].show" :style="getStyle(2)"/>
      <!-- 帮助 -->
      <help-list-wrap v-if="showItems[3].show" :style="getStyle(3)"/>
      <!-- 快捷键 -->
      <shortcut-list-wrap v-if="showItems[4].show" :style="getStyle(4)"/>
    </div>
  </div>
</template>

<script>
import ToolListWrap from './widgetPanel/toolListWrap'
import TechListWrap from './widgetPanel/techListWrap'
import ShareListWrap from './widgetPanel/shareListWrap'
import HelpListWrap from './widgetPanel/helpListWrap'
import ShortcutListWrap from './widgetPanel/shortcutListWrap'

export default {
  name: 'widgetPanel',
  data () {
    return {
      widgetItems: [
        {
          name: '工具类',
          icon: 'ios-briefcase',
          show: false
        },
        {
          name: '黑科技',
          icon: 'logo-buffer',
          show: false
        },
        {
          name: '爱分享',
          icon: 'md-heart',
          show: false
        }
      ],
      showItems: [
        {
          name: '工具类',
          icon: 'md-apps',
          show: false
        },
        {
          name: '黑科技',
          icon: 'logo-buffer',
          show: false
        },
        {
          name: '爱分享',
          icon: 'md-heart',
          show: false
        },
        {
          name: '帮助',
          icon: 'md-help-circle',
          show: false
        },
        {
          name: '快捷键',
          icon: 'md-keypad',
          show: false
        }
      ],
      activeWidgetClassify: -1,
      showWrap: 1,
      isActive: true
    }
  },
  components: {
    ToolListWrap,
    TechListWrap,
    ShareListWrap,
    HelpListWrap,
    ShortcutListWrap
  },
  watch: {
    activeWidgetClassify (index) {
      if (index >= 0 && index < this.showItems.length) {
        this.showItems[index].show = true
      }
    },
    showWrap (index) {
      console.log(index)
      this.showWrap = index
    }
  },
  mounted () {
    this.activeWidgetClassify = -1
  },
  methods: {
    clickItem (index) {
      this.activeWidgetClassify = index
      this.showWrap = index + 1
    },
    getStyle (index) {
      return {
        display: (this.activeWidgetClassify === index ? '' : 'none')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
#widget-panel
  position relative
  display flex
  // position absolute
  // height: calc(100% - 60px)
  height 100%
  z-index 99
  .widget-menu
    background #FFFFFF
    border-right 1px solid #E6E6E6
    width 80px
    height 100%
    display flex
    flex-direction column
    justify-content flex-start
    .widget-item
      width 100%
      min-height 50px
      // padding 20px 22px 20px 20px
      margin 20px auto
      cursor pointer
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      font-family MicrosoftYaHei-Bold
      font-weight 700
      font-size 12px
      &:hover,
      &.active
        color #FF7F00
      .item-name
        margin-top 10px
    .item-btns
      width 100%
      display flex
      flex-direction column
      justify-content space-between
      align-items center
      align-self flex-end
      margin-top 500px
      width 100%
      .item-btn
        display flex
        cursor pointer
        width 100%
        padding 12px 20px 12px 24px
        &:hover,
        &.active
          color #FF7F00
  .widget-wrap
    width 250px
    height 100%
    background white
    border-right 1px solid #eee
</style>
