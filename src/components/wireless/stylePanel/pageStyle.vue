<template>
  <div id="page-style">
    <Collapse v-model="activeNames">
      <Panel name="1">
        位置大小
        <div class="position-size" slot="content">
          <InputNumber label="X" v-model="defaultValue" :editable="false"></InputNumber>
          <InputNumber label="Y" v-model="defaultValue" :editable="false"></InputNumber>
          <InputNumber label="宽" v-model="dPage.width" @finish="(value) => finish('width', value)" ></InputNumber>
          <InputNumber label="高" v-model="dPage.height" @finish="(value) => finish('height', value)" ></InputNumber>
        </div>
      </Panel>
      <Panel name="2">
        样式设置
        <ColorPicker
          class="select-none"
          label="背景颜色"
          v-model="dPage.backgroundColor"
          @finish="(value) => finish('backgroundColor', value)"
          alpha
          slot="content"
        />
        <!-- <bg-img-select :img="innerElement.backgroundImage"/> -->
      </Panel>
      <Panel name="3">
        其他设置
        <Input
          label="名称"
          v-model="innerElement.name"
          @finish="(value) => finish('name', value)"
          slot="content"
        />
      </Panel>
      <Panel name="4">
        设置链接图片
        <Input
          label="名称"
          v-model="dPage.backgroundImage"
          @finish="(value) => finish('name', value)"
          slot="content"
        />
      </Panel>
    </Collapse>
  </div>
</template>

<script>
// 画布组件样式
import {
  mapGetters,
  mapActions
} from 'vuex'

const NAME = 'pageStyle'

export default {
  name: NAME,
  data () {
    return {
      activeNames: ['1', '2', '3', '4'],
      defaultValue: 0,
      defaultValueX: 0,
      defaultValueY: 0,
      innerElement: {},
      tag: false,
      ingoreKeys: [
        'backgroundColor',
        'name',
        'width',
        'height'
      ],
      myImg: 'https://i.loli.net/2019/03/26/5c99bf0846b36.jpg',
      imgInfo: {
        width: 0,
        height: 0
      }
    }
  },
  mounted () {
    // console.log(this.$data)
    var obj = JSON.parse(JSON.stringify(this.$data.imgInfo))
    let k = obj.width
    // console.log(this.$data.imgInfo)
    // console.log(JSON.parse(JSON.stringify(this.imgInfo)))
    let i = JSON.parse(JSON.stringify(this.imgInfo))
    this.dPage.width = i.width
    this.dPage.height = i.height
    // console.log(i)
    // console.log(this.dPage)
  },
  computed: {
    ...mapGetters([
      'dActiveElement',
      'dPage'
    ])
  },
  created () {
    this.change()
    this.getImageInfo()
  },
  watch: {
    dActiveElement: {
      handler (newValue, oldValue) {
        this.change()
      },
      deep: true
    },
    innerElement: {
      handler (newValue, oldValue) {
        this.changeValue()
      },
      deep: true
    },
    dPage: {
      handler () {
        this.changePic()
      }
    }
  },
  methods: {
    ...mapActions([
      'updatePageData'
    ]),
    getImageInfo () {
      let img = new Image()
      img.src = this.myImg
      const vm = this
      img.onload = function () {
        // vm.$set(vm.imgInfo, 'width', img.width)
        vm.$set(vm.imgInfo, 'height', img.height)
        vm.imgInfo.width = img.width
        console.log('a1', vm.imgInfo.width)
        console.log('a2', vm.imgInfo.height)
      }
      console.log('b1', vm.imgInfo.width)
      console.log('b2', vm.imgInfo.height)
      console.log('c1', vm.imgInfo)
    },
    // 对页面进行初始化
    initPageStyle () {
    },
    change () {
      this.tag = true
      this.innerElement = JSON.parse(JSON.stringify(this.dActiveElement))
    },
    changeValue () {
      if (this.tag) {
        this.tag = false
        return
      }
      for (let key in this.innerElement) {
        if (key !== 'record' && this.innerElement[key] !== this.dActiveElement[key]) {
          if (this.ingoreKeys.indexOf(key) !== -1) {
            this.dActiveElement[key] = this.innerElement[key]
          } else {
            this.updatePageData({
              key: key,
              value: this.innerElement[key]
            })
          }
        }
      }
    },
    finish (key, value) {
      this.updatePageData({
        key: key,
        value: value,
        pushHistory: true
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
// @import '~STYLUS/page-design.styl'
#page-style
  width: 100%
  height: 100%

.position-size
  width: 100%
  display: flex
  justify-content: space-between
.select
  margin-bottom: 10px
</style>
