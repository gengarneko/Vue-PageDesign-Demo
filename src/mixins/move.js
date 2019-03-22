var move = {
  methods: {
    initmovement (e) {
      var target = this.$store.state.pageDesign.dActiveElement
      // 设置移动状态初始值
      this.$store.dispatch('initDMove', {
        startX: e.pageX, // 起始 x 坐标
        startY: e.pageY, // 起始 y 坐标
        originX: target.left,
        originY: target.top
      })
      // 绑定鼠标移动事件
      document.addEventListener('mousemove', this.handlemousemove, true)
      // 取消鼠标移动事件
      document.addEventListener('mouseup', this.handlemouseup, true)
    },
    // 鼠标移动事件
    handlemousemove (e) {
      e.stopPropagation()
      e.preventDefault()

      this.$store.dispatch('dMove', {
        x: e.pageX,
        y: e.pageY
      })
    }
    // 鼠标松开事件
  }
}

export { move }
