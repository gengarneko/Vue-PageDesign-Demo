<template>
  <div id="img-water-fall" ref="imgWaterFall">
    <div
      class="content-box"
      :style="{top: contentTop + 'px'}"
    >
      <div
        class="img-box"
        v-for="(item, index) in innerListData"
        :key="index"
        :style="{
          width: boxWidth + 'px',
          height: boxWidth / item.ratio + 'px',
          top: item.top + 'px',
          left: item.left + 'px'
        }"
        @click.stop="selectImg(item, index)"
      >
        <transition name="fade">
          <img
            class="img"
            :src="item.value.url"
            :style="{
              width: boxWidth - 10 + 'px',
              height: boxWidth / item.ratio - 10 + 'px'
            }"
          >
        </transition>
        <div
          class="delete"
          v-if="item.value.canDel"
          @click.stop="deleteImg(item, index)"
        >
          <div class="bg"></div>
          <i class="delete-icon iconfont icon-delete"></i>
        </div>
      </div>
    </div>
    <div class="scroll-box" ref="scrollBox" id="scroll=box">
      <div
        class="scroll-bar"
        ref="scrollBar"
        id="scroll-bar"
        :style="{
          height: scrollbarStyle.height + 'px',
          top: scrollbarStyle.top + 'px',
          display: scrollbarStyle.display
        }"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'img-water-fall',
  props: {
    listData: {
      type: Array,
      required: true
    },
    sortBy: {
      default: ''
    },
    k: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      innerListData: [],
      parentWidth: 0,
      listHeight: 0,
      scrollBarStyle: {
        height: 0,
        top: 0,
        display: 'none'
      },
      contentTop: 0
    }
  },
  mounted() {
    this.parentWidth = this.$refs.imgWaterFall.clientWidth
    this.preLoadImg()
    this.$refs.scrollBar.onmousedown = this.tragScroll
    this.$refs.scrollBox.onmousedown = this.clickScroll
    this.mouseWheel(this.$refs.imgWaterFall, this.wheelChange)
  },
  computed: {
    boxWidth () {
      return (this.parentWidth - 5) / 3
    },
    scrollTop () {
      return this.scrollBarStyle.top
    }
  },
  watch: {
    listData (value) {
      this.preLoadImg()
    },
    listHeight (value) {
      this.resizeScorll()
    },
    scrollTop (value) {
      let scrollBar = this.$refs.scrollBar
      let boxHeight = scrollBar.parentNode.offsetHeight
      let barHeight = scrollBar.offsetHeight
      this.contentTop = -value * boxHeight / barHeight
    }
  },
  methods: {
    preLoadImg () {
      this.listData.forEach((item, index) => {
        this.innerListData.push({
          ratio: item.ratio,
          value: item
        })
      })
      this.imgWaterFall()
    },
    // 瀑布流
    WaterFall () {
      let heightList = [1, 1, 1]
      let len = this.innerListData.length
      for (let index = 0; index < len; ++index) {
        let item = this.innerListData[index]
        let col = 0
        let value = Math.min.apply(null, heightList)
        for (let j = 0; j < 3; ++j) {
          if (value === heightList[j]) {
            col = j
            break
          }
        }
        item.top = heightList[col]
        item.left = this.boxWidth * col + 1
        heightList[col] += this.boxWidth / item.ratio
      }
      this.listHeight = Math.max.apply(null, heightList)
    },
    // 选择图片
    selectImg (value, index) {
      this.$emit('select-mg', value)
    },
    // 删除图片
    deleteImg (value, index) {
      this.innerListData.splice(index, 1)
      this.WaterFall()
      this.$emit('delete-img', value)
    },
    // 鼠标滚动
    mouseWheel (obj, handler) {
      bind (obj, 'mousewheel', function (event) {
        let data = -getWheelData(event)
        handler(data)
        if (document.all) {
          window.event.returnValue = false
        } else {
          event.preventDefault()
        }
      })
      // 火狐
      bind (obj, 'DOMMouseScroll', function (event) {
        let data = getWheelData(event)
        handler(data)
        event.preventDefault()
      })
      function getWheelData (e) {
        return -e.deltaY
      }
      function bind (obj, type, handler) {
        if (obj.addEventListener) {
          obj.addEventListener(type, handler, false)
        } else if (obj.attachEvent) {
          obj.attachEvent('on' + type, handler)
        } else {
          obj['on' + type] = handler
        }
      }
    },
    // 调整滚动条
    resizeScorll () {
      let scrollBar = this.$refs.scrollBar
      let boxHeight = scrollBar.parentNode.offsetHeight
      let scrollHeight = boxHeight * boxHeight / this.listHeight
      this.scrollBarStyle.display = (this.listHeight <= boxHeight ? 'none' : '')
      this.scrollBarStyle.height = scrollHeight
    },
    // 拖拽滚动条
    tragScroll (e) {
      e.stopPropagation()
      e.preventDefault()
      let scrollBar = this.$refs.scrollBar
      let boxHeight = scrollBar.parentNode.offsetHeight
      let barHeight = scrollBar.offsetHeight
      let scrollTop = scrollBar.offsetTop
      let startTop = e.pageY
      document.addEventListener('mousemove', trag, true)
      document.addEventListener('mouseup', (e) => {
        e.stopPropagation()
        e.preventDefault()
        document.removeEventListener('mousemove', trag, true)
        document.removeEventListener('mouseup', trag, true)
      }, true)
      let _this = this
      function trag (e) {
        e.stopPropagation()
        e.preventDefault()
        let tragTop = e.pageY
        let temp = tragTop - startTop + scrollTop
        temp = Math.min(Math.max(0, temp), boxHeight - barHeight)
        scrollTop = temp
        startTop = tragTop
        _this.scrollBarStyle.top = temp
      }
    },
    // 鼠标滚轮滚动，滚动条滚动
    wheelChange (data) {
      let scrollBar = this.$refs.scrollBar
      let boxHeight = scrollBar.parentNode.offsetHeight
      let barHeight = scrollBar.offsetHeight
      let top = this.scrollBarStyle.top + data
      top = Math.min(Math.max(0, top), boxHeight - barHeight)
      this.scrollBarStyle.top = top
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~STYLUS/page-design.styl'
#img-water-fall
  position: relative
  width: 100%
  flex: 1
  overflow: hidden
  .scroll-box
    width: 5px
    position: absolute
    top: 0
    right: 1px
    height: 100%
    .scroll-bar
      position: absolute
      width: 5px
      top: 0
      background: $color-white
      border-radius: 10px
  .content-box
    position: absolute
    height: 100%
    top: 0
    left: 0
    .img-box
      position: absolute
      cursor: pointer
      padding: 5px
      &:hover
        outline: 1px solid $color-white
        .delete
          width: 40px
          height: 40px
          .bg
            border-top: 40px solid $color-light-gray
            border-right: 40px solid $color-transparent
          .delete-icon
            left: 5px
            top: 5px
            display: block
            position: absolute
      .delete
        position: absolute
        left: 0
        top: 0
        .delete-icon
          font-size: 12px
          color: $color-white
          display: none
.fade-enter-active
.fade-leave-active
  transition: opacity .5s
.fade-enter
.fade-leave-to
  opacity: 0
</style>
