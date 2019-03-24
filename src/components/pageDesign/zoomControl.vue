<template>
  <div id="zoom-control">
    <!-- 左边的缩小页面按钮 -->
    <Icon
      class="zoom-icon"
      type="md-remove-circle"
      @click.stop="activezoomIndex > 0 ? sub() : ''"
    />
    <!-- 中间的缩小数值 -->
    <Dropdown trigger="click">
      <div class="zoom-number">
        {{ zoom.text }}
      </div>
      <DropdownMenu
        slot="list"
      >
        <div
          class="dropdown-item"
          :class="{'zoom-item-active' : activezoomIndex === index}"
          v-for="(item, index) in zoomList"
          :key="index"
          @click.stop="selectItem(index)"
        >{{ item.text }}</div>
      </DropdownMenu>
    </Dropdown>
    <!-- 右边的放大页面按钮 -->
    <Icon
      class="zoom-icon"
      type="md-add-circle"
      @click.stop="otherIndex < otherList.length - 1 ? add() : ''"
    />
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  name: 'zoomControl',
  data () {
    return {
      activezoomIndex: 0,
      zoomList: [
        {
          text: '25%',
          value: 25
        },
        {
          text: '50%',
          value: 50
        },
        {
          text: '75%',
          value: 75
        },
        {
          text: '100%',
          value: 100
        },
        {
          text: '125%',
          value: 125
        },
        {
          text: '150%',
          value: 150
        },
        {
          text: '200%',
          value: 200
        },
        {
          text: '最佳尺寸',
          value: -1,
          icon: 'icon-best-size'
        }
      ],
      show: false,
      zoom: {
        value: 0,
        text: 0
      },
      otherList: [
        {
          text: '250%',
          value: 250
        },
        {
          text: '300%',
          value: 300
        },
        {
          text: '350%',
          value: 350
        },
        {
          text: '400%',
          value: 400
        },
        {
          text: '450%',
          value: 450
        },
        {
          text: '500%',
          value: 500
        }
      ],
      otherIndex: -1,
      bestZoom: 0
    }
  },
  mounted () {
    window.addEventListener('click', this.close)
    this.activezoomIndex = this.zoomList.length - 1
  },
  beforeDestroy () {
    window.removeEventListener('click', this.close)
  },
  computed: {
    ...mapGetters([
      'dPage',
      'dScreen'
    ])
  },
  watch: {
    activezoomIndex (value) {
      if (value < 0 || value > this.zoomList.length - 1) {
        return
      }
      this.zoom = this.zoomList[value]
    },
    otherIndex (value) {
      if (value < 0 || value > this.otherList.length - 1) {
        return
      }
      this.zoom = this.otherList[value]
    },
    zoom (value) {
      let realValue = value.value
      if (realValue === -1) {
        realValue = this.calcZoom()
      }
      this.updateZoom(realValue)
    }
  },
  methods: {
    ...mapActions([
      'updateZoom'
    ]),
    handle (index) {
      alert(1)
    },
    selectItem (index) {
      this.activezoomIndex = index
      this.otherIndex = -1
      this.show = false
    },
    close (e) {
      this.show = false
    },
    add () {
      this.show = false
      if (this.activezoomIndex === this.zoomList.length - 2 ||
        this.activezoomIndex === this.zoomList.length - 1) {
        this.activezoomIndex = this.zoomList.length
        this.otherIndex += 1
        return
      }
      if (this.activezoomIndex !== this.zoomList.length) {
        this.activezoomIndex++
        return
      }
      if (this.otherIndex < this.otherList.length - 1) {
        this.otherIndex++
      }
    },
    sub () {
      this.show = false
      if (this.otherIndex === 0) {
        this.otherIndex = -1
        this.activezoomIndex = this.zoomList.length - 2
        return
      }
      if (this.otherIndex !== -1) {
        this.otherIndex--
        return
      }
      if (this.activezoomIndex === this.zoomList.length - 1) {
        this.activezoomIndex = this.zoomList.length - 2
        return
      }
      if (this.activezoomIndex !== 0) {
        this.activezoomIndex--
      }
    },
    calcZoom () {
      let widthZoom = (this.dScreen.width - 142) * 100 / this.dPage.width
      let heightZoom = (this.dScreen.height - 122) * 100 / this.dPage.height

      this.bestZoom = Math.min(widthZoom, heightZoom)
      return this.bestZoom
    }
  }
}
</script>

<style lang="stylus">
#zoom-control
  .ivu-select-dropdown
    top 58px!important
  .ivu-select-dropdown
    .ivu-dropdown-menu
      .dropdown-item
        text-align center
        cursor pointer
        &:hover
          background-color #eee
</style>

<style lang="stylus">
#zoom-control
  color #6c788c
  display flex
  justify-content sapce-space-between
  align-items center
  font-size 16px
  .zoom-icon
    margin 0 20px
    cursor pointer
    &:hover
      color #515a6e
  .zoom-number
    cursor pointer
    contenteditable true
    &:hover,
    &:focus,
    &:active
      color #515a6e
</style>
