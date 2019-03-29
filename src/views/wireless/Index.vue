<template>
  <div
    id="page-design-index"
    ref="pageDesignIndex"
  >
    <!-- 头部导航 -->
    <!-- 引入 iview 栅格 -->
    <Row id="home-header">
      <i-col class="header-col" span="6">
        <!-- logo 图片区域 -->
        <div class="header-logo">
          <div class="logo">
            小语言
          </div>
        </div>
        <!-- 选择应用平台 -->
        <div class="header-name">
          <Cascader
            class="name-select"
            :data="data"
            v-model="value1"
            trigger="hover"
            :clearable="false"
            :render-format="format"
          ></Cascader>
        </div>
      </i-col>

      <i-col class="header-col header-zoom" span="12">
        <!-- 缩放组件 -->
        <zoom-control></zoom-control>
      </i-col>

      <i-col class="header-col header-btns" span="6">
        <!-- 按钮组 -->
        <div class="btn">
          <Button size="large">文件列表</Button>
          <Button size="large" @click="save()">保存</Button>
          <Button size="large" @click="build()" type="warning">生成代码</Button>
        </div>
        <!-- 用户信息组件 -->
      </i-col>

    </Row>
    <!-- 主要内容容器 -->
    <div class="page-design-index-wrap">
      <!-- 左侧组件栏 -->
      <widget-panel></widget-panel>
      <!-- 中间内容区域 -->
      <page-design
        class="page-design-wrap"
        pageDesignCanvasId="page-design-canvas"
      ></page-design>
      <!-- 右侧样式栏 -->
      <style-panel></style-panel>
    </div>

    <!-- 操作栏 -->
    <div class="operation">
      <ul class="operation-wrap">
        <!-- 复制组件/图片容器 -->
        <li
          class="operation-item"
          :class="{'disable' : dActiveElement.uuid === '-1'}"
          @click="dActiveElement.uuid !== '-1' ? handle('copy') : ''"
        >
          <Tooltip content="复制" placement="right-start">
            <div class="iconfont icon-fuzhi"></div>
            <icon-svg icon-class="icon-fuzhi" />
          </Tooltip>
        </li>
        <icon-svg icon-class="icon-fuzhi" />
        <icon-svg icon-class="icon-fuzhi" />
        <!-- 粘贴组件/图片容器 -->
        <!-- <li
          class="operation-item"
          :class="{'disable' : dCopyElement.length === 0}"
          @click="dCopyElement.length !== 0 ? handle('paste') : ''"
        >
          <Tooltip content="粘贴" placement="right-start">
            <div class="iconfont icon-fuzhi"></div>
          </Tooltip>
        </li> -->
        <!-- 分割线 -->
        <Divider class="divider"/>
        <!-- 上移图片容器 -->
        <li
          class="operation-item"
          :class="{'disable' : dActiveElement.uuid === '-1'}"
          @click="dActiveElement.uuid !== '-1' ? handle('copy') : ''"
        >
          <Tooltip content="上移" placement="right-start">
            <div class="iconfont icon-shangyi"></div>
          </Tooltip>
        </li>
        <!-- 下移图片容器 -->
        <li
          class="operation-item"
          :class="{'disable' : dCopyElement.length === 0}"
          @click="dCopyElement.length !== 0 ? handle('paste') : ''"
        >
          <Tooltip content="下移" placement="right-start">
            <div class="iconfont icon-xiayi"></div>
          </Tooltip>
        </li>
        <!-- 分割线 -->
        <Divider class="divider"/>
        <!-- 设置网格线 -->
        <!-- <li
          class="operation-item"
          :class="{'operation-item-active' : showGridSizeList}"
          @click.stop="showGridSizeList = !showGridSizeList"
        >
          <Tooltip content="网格线" placement="right-start">
            <Icon type="md-grid" />
          </Tooltip>
          <ul class="grid-selecter" v-show="showGridSizeList">
            <li
              v-for="(item, index) in gridSizeList"
              :key="index"
              class="grid-item"
              :class="{'grid-item-active' : gridSizeIndex === index}"
              @click="gridSizeIndex = index">
              <span>{{ item.value }}</span>
              <i class="iconfont icon-selected" v-if="gridSizeIndex === index"></i>
            </li>
          </ul>
        </li> -->
        <!-- 显示辅助线 -->
        <!-- <li
          class="operation-item"
          :class="{'operation-item-active' : dShowRefLine}"
          @click.stop="showRefLine(!dShowRefLine)"
        >
          <Tooltip content="辅助线" placement="right-start">
            <Icon type="ios-grid-outline" />
          </Tooltip>
        </li> -->
        <!-- 分割线 -->
        <!-- <Divider class="divider"/> -->
        <!-- 删除目标组件 -->
        <li
          class="operation-item"
          :class="{'disable' : dActiveElement.uuid === '-1'}"
          @click="dActiveElement.uuid !== '-1' ? handle('delete') : ''"
        >
          <Tooltip content="删除" placement="right-start">
            <div class="iconfont icon-shanchu"></div>
          </Tooltip>
        </li>
      </ul>
    </div>

    <!-- 效果预览 -->
    <div class="fill-info-wrap" v-if="fillInfoing">
      <div class="fill-info-content" v-loading="publishing">
        <el-steps
          :active="active[fillStep]"
          finish-status="success"
          align-center
        >
          <el-step :title="message['1']"></el-step>
        </el-steps>
        <div
          class="fill-info-step"
          v-if="fillStep === 1"
          v-loading="true"
        >
        </div>
        <div class="fill-info-step" v-show="fillStep === 2 || fillStep === 3">
          <div id="cover-wrap">
            <img id="cover" />
          </div>
          <div class="publish-btn" @click="saveImg">
            <span v-show="!publishing">保存图片</span>
            <i class="el-icon-loading" v-show="publishing"></i>
          </div>
          <div class="close-publish" @click="closePublish">
            关闭
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { shortcuts } from '@/mixins/shortcuts'
import zoomControl from '@/components/pageDesign/zoomControl'
import widgetPanel from '@/components/wireless/widgetPanel'
import pageDesign from '@/components/wireless/pageDesign'
import stylePanel from '@/components/wireless/stylePanel'
import hotzone from '@/components/hotzone/hotzone'
// import sizeControl from '@/common/sizeControl'
export default {
  name: 'pageDesignIndex',
  data () {
    return {
      value1: [],
      data: [
        {
          value: 'jingdong',
          label: '京东',
          children: [
            {
              value: 'jingdongwuxian',
              label: '无线版',
              name: '京东无线版'
            },
            {
              value: 'jingdongpc',
              label: 'PC 版',
              name: '京东 PC 版'
            }
          ]
        },
        {
          value: 'taobao',
          label: '淘宝天猫',
          children: [
            {
              value: 'taobaowuxian',
              label: '无线版',
              name: '淘宝天猫无线版'
            },
            {
              value: 'taobaopc',
              label: 'PC 版',
              name: '淘宝天猫 PC 版'
            }
          ]
        },
        {
          value: 'suning',
          label: '苏宁',
          children: [
            {
              value: 'suningwuxian',
              label: '无线版',
              name: '苏宁无线版'
            },
            {
              value: 'suningpc',
              label: 'PC 版',
              name: '苏宁 PC 版'
            }
          ]
        }
      ],
      style: {
        left: '0px'
      },
      gridSizeList: [
        {
          width: 0,
          height: 0,
          value: '无'
        },
        {
          width: 10,
          height: 10,
          value: '10x10'
        },
        {
          width: 20,
          height: 20,
          value: '20x20'
        },
        {
          width: 50,
          height: 50,
          value: '50x50'
        },
        {
          width: 75,
          height: 75,
          value: '75x75'
        },
        {
          width: 100,
          height: 100,
          value: '100x100'
        }
      ],
      gridSizeIndex: 0,
      showGridSizeList: false,
      showMenuBg: false,
      menuList: {
        left: 0,
        top: 0,
        list: []
      },
      widgetMenu: [
        {
          type: 'copy',
          text: '复制'
        },
        {
          type: 'paste',
          text: '粘贴'
        },
        {
          type: 'index-up',
          text: '上移一层'
        },
        {
          type: 'index-down',
          text: '下移一层'
        },
        {
          type: 'del',
          text: '删除'
        }
      ],
      pageMenu: [
        {
          type: 'paste',
          text: '粘贴'
        }
      ],
      fillInfoing: false,
      message: {
        '1': '生成封面图',
        '2': '填写模板信息',
        '3': '发布模板'
      },
      active: {
        '1': 0,
        '2': 1,
        '3': 2
      },
      fillStep: 1,
      formParams: {},
      title: '',
      publishing: false
    }
  },
  computed: {
    ...mapGetters([
      'dHistoryParams',
      'dActiveElement',
      'dShowRefLine',
      'dCopyElement',
      'dPage',
      'dAltDown',
      'dWidgets',
      'dZoom'
    ])
  },
  mixins: [shortcuts],
  components: {
    zoomControl,
    widgetPanel,
    pageDesign,
    stylePanel,
    hotzone
    // sizeControl
  },
  methods: {
    format (labels, selectedData) {
      const index = labels.length - 1
      const data = selectedData[index] || false
      if (data && data.label) {
        return data.name
      }
      return labels[index]
    },
    save () {
      alert('保存')
    },
    build () {
      alert('生成代码')
    }
  }
}
</script>

<style lang="stylus" scoped>
#page-design-index
  width 100%
  min-width 1180px
  height: 100%
  min-height: 500px
  position: absolute
  // background-color: #efefef
  display: flex
  flex-direction: column
  #home-header
    height 60px
    border-bottom 1px solid #e6e6e6
    align-items center
    .header-col
      height 100%
      display flex
      align-items center
      margin-left 0
      .header-logo
        min-width 123px
        height 100%
        padding 17px 25px 21px 26px
        font-size 24px
        line-height 22px
        cursor pointer
        &:hover
          background #eeeeee
      .header-name
        padding 0 20px
        height 100%
        display flex
        align-items center
        .header-select
          height 100%
          display flex
    .header-zoom
      display flex
      justify-content center
      align-items center
    .header-btns
      display flex
      justify-content flex-end
      .btn
        min-width 280px
        Button
          margin 0 6px
  .page-design-index-wrap
    width 100%
    height 100%
    flex 1
    display flex
    overflow hidden
    .page-design-wrap
      flex 1
.operation
  z-index 1000
  width 30px
  position absolute
  top 200px
  right 320px
  border-radius 4px
  box-shadow 1px 1px 10px 3px rgba(0, 0, 0, .1)
  .operation-wrap
    padding 5px 0
    .divider
      margin 3px 0
    .operation-item
      width 100%
      font-size 20px
      display flex
      justify-content center
      align-items center
      padding 3px 0
      line-height 1
      color #6E747D
      &:nth-child(3)
      &:nth-child(4)
        .iconfont:before
          height 16px
          width 16px
          font-size 16px
      .iconfont
        height 20px
        width 20px
        &::before
          height 18px
          width 18px
          font-size 18px
      &:hover
        cursor pointer
        background #eee
      .grid-selecter
        position absolute
        width 60px
        left -8px
        transform: translateX(-100%)
        background #eee
        .grid-item
          width 100%
          height 20px
          font-size 10px
          padding 5px
          display flex
          align-items center
          cursor pointer
          color #515a6e
          span
            flex 1
          &:hover
            color #ff7f00
        .grid-item-active
          color #ff7f00
          background-color #50555b
    .operation-item-active
      color #ff7f00
    .disable
      color: #808080
      &:hover
        color: #808080
        background-color: #ff7f00
        cursor: not-allowed
</style>
