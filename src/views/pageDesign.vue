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
          v-for="layer in getlayers()"
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

    <!-- 以下是测试代码 -->
    <button @click="handleTestButton">
      前后交互 - 接口数据
    </button>
    <div>
      {{ dZoom }}
      {{ dPage }}
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import { move } from '../mixins/move'

const NAME = 'page-design'

export default {
  name: NAME,
  // 传入画布对应的 ID
  props: ['pageDesignCanvasId'],
  data () {
    return {
      // page: this.$store.getters.dZoom
      page: this.$store.getters
    }
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
  methods: {
    ...mapActions([
      'updateScreen', // 更新视图
      'selectWidget', // 选择组件
      'deleteWidget' // 删除组件
    ]),
    handleTestButton () {
      var n = this.$store.state
      // var i = this.$store.getters.dPage
      // alert(n)
      console.log(n)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
