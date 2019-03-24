// 我们并不打算在 输入框 和 文字区域 进行快捷键操作
// 所以我们声明一个数组 ignoreNode 来存放需要忽略的节点
const ignoreNode = [
  'INPUT',
  'TEXTAREA'
]

// 系统组合键
const systemKeyCode = [
  {
    // ctrl + r 刷新
    key: ['ctrlKey', 'metaKey'],
    code: 82 // r 键
  },
  {
    // ctrl + alt + i 打开开发者界面
    key: ['ctrlKey', 'metaKey'],
    key2: ['altKey'],
    code: 73 // i 键
  }
]

// 判断按键是否按下
// 将初始值设置为 false
let hadDown = false

let shortcuts = {
  methods: {
    // 判断按键按下的事件
    handleKeyDown (e) {
      // node 一直是 BODY
      let nodeName = e.target.nodeName
      /***************************************************************/
      // 如果目标 DOM 属于
      //  1.可忽略元素中的一种
      //  2.它是一个内容可编辑的 DIV
      // 那么它就不适用于快捷键规则
      // 函数终止
      if (ignoreNode.indexOf(nodeName) !== -1 ||
            (nodeName === 'DIV' && e.target.contentEditable === 'true')
      ) {
        return
      }
      // 如果目标 DOM 满足以下n任一条件
      //  1.初始值为 false
      //  2.showMenuBg 为 false
      if (hadDown || this.showMenuBg) {
        e.stopPropagination()
        e.preventDefault()
        return
      }
      /***************************************************************/
      hadDown = true
      let ctrl = e.key === 'Control' || e.key === 'Meta'
      let alt = e.key === 'Alt'
      let shift = e.key === 'Shift'
      // 四个方向键
      let dir = e.keyCode === 37 || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40
      // 以上都是特殊按键
      let specialKey = ctrl || alt || shift || dir
      if (specialKey || e.metaKey) {
        hadDown = false
      }
      // 我们使用 alt 键来触发组合方法
      if (alt) {
        this.$store.dispatch('updateDown', true)
      }
      /***************************************************************/
      // 遍历数组
      // 返回数组中通过测试（函数内判断）的数组的第一个元素的值
      // 为每个元素都调用一次函数执行
      // 先判断 key 中有没有 ctrl/meta
      // 如果存在，则返回 true，跳出循环
      // 如果不在，则返回 false，继续循环
      let systemKey = systemKeyCode.find(item => {
        let f = false
        let f2 = false
        // 遍历 key 数组
        for (let i = 0; i < item.key.length; ++i) {
          // 调用 e 对象的 item.key[i] 属性
          // 将属性赋值给 f
          f = e[item.key[i]]
          if (f) {
            break
          }
        }
        // key 中不存在 ctrl/meta，则继续此循环
        // 遍历 key2，寻找 alt 的值
        if (item.key2) {
          for (let i = 0; i < item.key2.length; ++i) {
            f2 = e[item.key[i]]
            if (f) {
              break
            }
          }
        }
        // 经过两次判断，输出相应结果
        // 只有 ctrl+r 和 ctrl+alt+i 组合可以响应
        return f && f2 && e.keyCode === item.code
      })
      // 如果 systemKey 的值为 true，则退出函数
      if (systemKey) {
        return
      }
      /***************************************************************/
      // 用以判断按下 ctrl/alt/shift 键
      // 使用 withCtrl 判断是否是 ctrl+正常键 的组合
      let withCtrl = e.ctrlKey || e.metaKey
      if (withCtrl && !specialKey) {
        this.dealCtrl(e)
        return
      }
      // 使用 withAlt 判断是否是 alt+正常键 的组合
      let withAlt = e.altKey
      if (withAlt && !specialKey) {
        return
      }
      // 使用 withShift 判断是否是 Shift+正常键 的组合
      let withShift = e.shiftKey
      if (withShift && !specialKey) {
        return
      }
      /***************************************************************/
      // 活跃组件的 uuid 不为 -1 的时候
      // 仅执行一次
      if (this.dActiveElement.uuid === '-1') {
        return
      }
      e.stopPropagation()
      e.preventDefault()
      /***************************************************************/
      // 使用 shift 按键控制移动步频
      let f = withShift ? 10 : 1
      switch (e.keyCode) {
        case 38:
          this.udlr('top', -1 * f)
          break
        case 40:
          this.udlr('top', 1 * f)
          break
        case 37:
          this.udlr('left', -1 * f)
          break
        case 39:
          this.udlr('left', 1 * f)
          break
        // delete 和 后退 键触发删除事件
        case 46:
        case 8:
          this.$store.dispatch('deleteWidget')
          break
      }
    },
    // 事件松开的事件
    // 这里我们来控制 alt 键
    // 如果松开，则值为 false，不能触发组合事件
    handleKeyUp (e) {
      hadDown = false
      if (e.key === 'ALt') {
        this.$store.dispatch('updateAltDown', false)
      }
    },
    // 键盘方向键对应的不同事件
    udlr (type, value) {
      let result = this.dActiveElement[type] + value
      if (type === 'left') {
        result = Math.max(0, Math.min(this.dPage.width - this.dActiveElement.record.width, result))
      } else {
        result = Math.max(0, Math.min(this.dPage.height - this.dActiveElement.record.height, result))
      }
      this.$store.dispatch('updateWidgetData', {
        uuid: this.dActiveElement.uuid,
        key: type,
        value: result
      })
    },
    dealCtrl (e) {
      // console.log(e.key, e.keyCode)
      switch (e.keyCode) {
        case 67: // c
          if (this.dActiveElement.uuid === '-1') {
            return
          }
          this.copyWidget()
          break
        case 86: // v
          if (this.dCopyElement.length === 0) {
            return
          }
          this.pasteWidget()
          break
        case 90: // z
          if (e.shiftKey) {
            if (!(this.dHistoryParams.index === this.dHistoryParams.length - 1)) {
              this.handleHistory('redo')
            }
          } else if (!(this.dHistoryParams.index === -1 || (this.dHistoryParams === 0 && this.dHistoryParams.length === 10))) {
            this.handleHistory('undo')
          }
          break
        case 83: // s
          // this.save()
          break
      }
    }
  }
}

export { shortcuts }
