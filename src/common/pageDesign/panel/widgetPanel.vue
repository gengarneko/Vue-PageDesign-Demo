<template>
  <div id="widget-panel">
    <div class="widget-classify">
      <ul class="classify-wrap">
        <li
          class="classify-item"
          :class="{ 'active-classify-item' : activeWidgetClassify === index}"
          v-for="(item, index) in widgetClassifyList"
          :key="index"
          @click="clickClassify(index)"
        >
          <i :class="item.icon" class="iconfont">
          <p>{{ item.name }}</p>
        </li>
      </ul>
      <div class="widget-wrap">
        <text-list-wrap v-if="widgetClassifyList[0].show" :style="getStyle(0)" />
        <shape-list-wrap v-if="widgetClassifyList[1].show" :style="getStyle(1)" />
        <img-list-wrap v-if="widgetClassifyList[2].show" :style="getStyle(2)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'widget-panel',
  data () {
    return {
      widgetClassifyList: [
        {
          name: '文本',
          icon: 'icon-text',
          show: false
        },
        {
          name: '形状',
          icon: 'icon-shape',
          show: false
        },
        {
          name: '图片',
          icon: 'icon-pic',
          show: false
        },
        {
          name: '素材',
          icon: 'icon-material',
          show: false
        }
      ],
      activeWidgetClassify: -1
    }
  },
  watch: {
    activeWidgetClassify (index) {
      if (index >= 0 && index < this.widgetClassifyList.length) {
        this.widgetClassifyList[index].show = true
      }
    }
  },
  
}
</script>