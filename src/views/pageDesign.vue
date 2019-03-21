<template>
  <div
    id="page-design"
    ref="page-design"
    style="width: 300px;"
  >
    <!-- 包裹着画布的外部容器 -->
    <div
      class="out-page"
      :style="{
        width: dPage.width * dZoom / 100 + 120 + 'px',
        height: dPage.height * dZoom / 100 + 120 + 'px',
        opacity: 1 - ( dZoom < 100 ? dPage.tag : 0 )
      }"
    >

    </div>
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
  mapGetters
  // mapActions
} from 'vuex'

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
  methods: {
    handleTestButton () {
      var n = this.$store.state
      // var i = this.$store.getters.dPage
      // alert(n)
      console.log(n)
    }
  }
}
</script>
