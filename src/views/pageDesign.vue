<template>
  <div
    id="page-design"
    ref="page-design"
  >
    <!-- 包裹着画布的外部容器 -->
    <div
      class="design-out"
      :style="{
        width: dPage.width * dZoom / 100 + 120 + 'px',
        height: dPage.height * dZoom / 100 + 120 + 'px',
        opacity: 1 - ( dZoom < 100 ? dPage.tag : 0 ),
      }"
    >
      <!-- 如果 zoom 超过 100 那么就从左上角开始变化 -->
      <div
        class="design-canvas"
        :data-type="dPage.type"
        :data-uuid="dPage.uuid"
        :id="pageDesignCanvasId"
        :style="{
          width: dPage.width + 'px',
          height: dPage.height + 'px',
          transform: 'scale(' + dZoom / 100 + ')',
          transformOrigin: ( dZoom >= 100 ? 'center' : 'left' ) + ' top',
          backgroundColor: dPage.backgroundColor,
          backgroundImage: 'url(\'' + ( dPage.backgroundImage ? dPage.backgroundImage : '' ) + '\')',
          opacity: dPage.opacity + ( dZoom < 100 ? dPage.tag : 0 )
        }"
      >
        <!-- 背景网格 -->
        <grid-size></grid-size>
        <!-- 组件 -->
        <component
          :is="layer.type"
          class="layer"
          :class="{
            'layer-active': getIsActive(layer.uuid),
            'layer-hover': layer.uuid === dHoverUuid || dActiveElement.parent === layer.uuid
          }"
          :data-title="layer.type"
          v-for="layer in getLayers()"
          :key="layer.uuid"
          :params="layer"
          :parent="dPage"
          :data-type="layer.type"
          :data-uuid="layer.uuid"
        >
          <!-- 仅支持两层嵌套的组合 -->
          <component
            v-if="layer.isContainer"
            :is="widget.type"
            class="layer"
            :class="{
              'layer-active': getIsActive(widget.uuid),
              'layer-no-hover': dActiveElement.uuid !== widget.parent && dActiveElement.parent !== widget.parent,
              'layer-hover': widget.uuid === dHoverUuid
            }"
            :data-title="widget.type"
            v-for="widget in getChilds(layer.uuid)"
            :key="widget.uuid"
            :params="widget"
            :parent="layer"
            :data-type="widget.type"
            :data-uuid="widget.uuid"
          />
        </component>
        <!-- 参考线 -->
        <ref-line v-if="dSelectWidgets.length"></ref-line>
        <!-- 缩放控制 -->
        <size-control v-if="dSelectWidgets.length"></size-control>
      </div>
    </div>
    <button @click="handleButton()">
      {{ dZoom }} - 测试按钮
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { move } from '../mixins/move'
import gridSize from '../common/gridSize'
import refLine from '../common/refLine'
import sizeControl from '../common/sizeControl'

const NAME = 'page-design'

export default {
  name: NAME,
  // 传入画布对应的 ID
  props: ['pageDesignCanvasId'],
  data () {
    return {
      // page: this.$store.getters.dZoom
      // page: this.$store.getters
    }
  },
  components: {
    gridSize,
    refLine,
    sizeControl
  },
  computed: {
    ...mapGetters([
      'dPage', // 画板对象
      'dZoom', // 缩放数组
      'dScreen', // 编辑界面对象
      'dWidgets', // 已用组件数组
      'dActiveElement', // 被选中的组件或者页面组件
      'dHoverUuid', // 鼠标所在图层
      'dSelectWidgets', // 记录多选组件数组
      'dAltDown' // 记录 alt 按键是否被按下
    ])
  },
  mixins: [move],
  mounted () {
    this.getScreen()
    document.getElementById('page-design').addEventListener('mousedown', this.handleSelection, false)
  },
  beforeDestroy () {
  },
  methods: {
    ...mapActions([
      'updateScreen', // 更新视图
      'selectWidget', // 选择组件
      'deleteWidget' // 删除组件
    ]),
    // handleTestButton () {
    //   var n = this.$store.state
    //   // var i = this.$store.getters.dPage
    //   // alert(n)
    //   console.log(n)
    // },
    handleButton () {
      let nn = this.getScreen
      console.log(nn)
    },
    getScreen () {
      let screen = this.$refs['page-design']
      this.updateScreen({
        width: screen.offsetWidth,
        height: screen.offsetHeight
      })
    },
    handleSelection (e) {
      if (e.which === 3) {
        return
      }
      let target = e.target
      let type = target.getAttribute('date-type')

      if (type) {
        let uuid = target.getAttribute('data-uuid')
        if (uuid !== '-1' && !this.dAltDown) {
          let widget = this.dWidgets.find(item => item.uuid === uuid)
          if (widget.parent !== '-1' &&
            widget.parent !== this.dActiveElement.uuid &&
            widget.parent !== this.dActiveElement.parent) {
            uuid = widget.parent
          }
        }
        // 设置选中的元素
        this.selectWidget({
          uuid: uuid
        })

        if (uuid !== '-1') {
          this.initmovement(e) // mixins
        }
      } else {
        // 取消选中元素
        this.selectWidget({
          uuid: '-1'
        })
      }
    },
    getLayers () {
      return this.dWidgets.filter(
        item => item.parent === this.dPage.uuid
      )
    },
    getChilds (uuid) {
      return this.dWidgets.filter(
        item => item.parent === uuid
      )
    },
    getIsActive (uuid) {
      if (this.dSelectWidgets.length > 0) {
        let widget = this.dSelectWidgets.find(item => item.uuid === uuid)
        if (widget) {
          return true
        }
        return false
      } else {
        return uuid === this.dActiveElement.uuid
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
// @import '~STYLUS/page-design.styl'
#page-design
  position: relative
  width: 100%
  height: 100%
  overflow: auto
  .design-out
    position: relative
    margin: 0 auto
    padding: 60px
    .design-canvas
      position: relative
      margin: 0 auto
      background-repeat: no-repeat
      background-position: center
      background-size: cover
      box-shadow: 1px 1px 10px 3px rgba(0, 0, 0, .1)
</style>
