// const generate = require('nanoid/generate')
// 全局属性
const state = {
  // 01 背景画布区域对象
  dPage: {
    name: '背景页面',
    type: 'page',
    uuid: '-1',
    left: '0',
    top: '0',
    width: 750, // 画布宽度
    height: 1334, // 画布高度
    backgroundColor: '#fff', // 背景色
    backgroundImage: '', // 背景图
    opacity: '1', // 透明程度
    tag: 0, // 控制强制刷新
    setting: [
      {
        label: '背景颜色',
        parentKey: 'backgroundColor',
        value: false
      }
    ],
    record: {}
  },
  // 02 缩放百分比
  dZoom: 100,
  // 03 编辑页面对象
  Screen: {
    width: 0, // 编辑界面宽度
    height: 0 // 编辑页面高度
  },
  // 04 已展示的组件
  dWidgets: [],
  // 05 被选中的组件或页面，单数
  dActiveElement: {},
  // 06 鼠标所在组件 ID，初始为画布
  dHoverUuid: '-1',
  // 07 多选的组件数组
  dSelectWidgets: [],
  // 08 记录是否按下 Alt 键，boolean
  dAltDown: false,
  // 09 背景网格大小
  gridSize: {
    width: 0, // 网格宽度
    height: 0 // 网格高度
  },
  // 10 添加一个组件它的初始值
  dActiveWidgetXY: {
    x: 0,
    y: 0
  },
  // 11 鼠标按下时的坐标
  dMouseXY: {
    x: 0,
    y: 0
  },
  // 12 判断是否正在移动组件，boolean
  dMoving: false,
  // 13 判断是否正在调整组件宽高，boolean
  dResizing: false,
  // 14 是否显示参考线，boolean
  dShowRefLine: false,
  // 15 初始化组件宽高
  dResizeWH: {
    width: 0,
    height: 0
  },
  // 16 复制的组件数组
  dCopyElement: [],
  // 17 操作历史，直接保存整个画布的 JSON
  dHistory: [],
  // 18 历史操作中出现的激活组件
  dActiveUuidHistory: [],
  // 19 历史操作对应的 page
  dPageHistory: [],
  // 20 历史参数
  dHistoryParams: {
    index: -1,
    length: 0
  },
  // 21 组合 json 数据
  dGroupJson: {},
  // 22 历史选择颜色
  dColorHistory: [
    'rgba(255, 69, 0, 1)',
    'rgba(255, 140, 0, 1)',
    'rgba(255, 215, 0, 1)',
    'rgba(144, 238, 144, 1)',
    'rgba(0, 206, 209, 1)',
    'rgba(30, 144, 255, 1)',
    'rgba(199, 21, 133, 1)',
    'rgba(255, 69, 0, 0.68)',
    'rgba(255, 120, 0, 1)',
    'rgba(250, 212, 0, 1)',
    'rgba(144, 240, 144, 0.5)',
    'rgba(0, 186, 189, 1)',
    'rgba(31, 147, 255, 0.73)',
    'rgba(199, 21, 133, 0.46)'
  ]
}
// 获取属性
const getters = {
  dPage (state) { // 01
    return state.dPage
  },
  dZoom (state) { // 02
    return state.dZoom
  },
  dScreen (state) { // 03
    return state.dScreen
  },
  dWidgets (state) { // 04
    return state.dWidgets
  },
  dActiveElement (state) { // 05
    return state.dActiveElement
  },
  dHoverUuid (state) { // 06
    return state.dHoverUuid
  },
  dSelectWidgets (state) { // 07
    return state.dSelectWidgets
  },
  dAltDown (state) { // 08
    return state.dAltDown
  },
  gridSize (state) { // 09
    return state.gridSize
  },
  dActiveWidgetXY (state) { // 10
    return state.dActiveWidgetXY
  },
  dMouseXY (state) { // 11
    return state.dMouseXY
  },
  dMoving (state) { // 12
    return state.dMoving
  },
  dResizing (state) { // 13
    return state.dResizing
  },
  dShowRefLine (state) { // 14
    return state.dShowRefLine
  },
  dResizeWH (state) { // 15
    return state.dResizeWH
  },
  dCopyElement (state) { // 16
    return state.dCopyElement
  },
  dHistory (state) { // 17
    return state.dHistory
  },
  dActiveUuidHistory (state) { // 18
    return state.dActiveUuidHistory
  },
  dPageHistory (state) { // 19
    return state.dPageHistory
  },
  dHistoryParams (state) { // 20
    return state.dHistoryParams
  },
  dGroupJson (state) { // 21
    return state.dGroupJson
  },
  dColorHistory (state) { // 22
    return state.dColorHistory
  }

}
// 全局方法
const actions = {
  /**
   * 保存操作历史，
   * 修改数据、移动完成后都会自动保存
   * 同时会保存当前激活的组件的 uuid，方便撤回时自动激活
   */
  pushHistory (store) {
    // 记录数组，保存历史操作
    let history = store.state.dHistory
    // 记录数组，保存历史操作中激活的组件
    let uuidHistory = store.state.dActiveUuidHistory
    // 记录数组，保存历史操作中的页面
    let pageHistory = store.state.dPageHistory
    // 控制历史操作的对象
    let historyParams = store.state.dHistoryParams

    // 下标不等于 -1 表示已存在历史操作记录
    // 下标小于历史长度-1，说明不是在末尾添加记录
    // 需要先删除掉下标之后的数据，否则会出现错乱
    if (historyParams.index < history.length - 1) {
      let index = historyParams.index + 1
      let len = history.length - index
      // 删除下标之后 len 个数据
      history.splice(index, len)
      uuidHistory.splice(index, len)
      pageHistory.splice(index, len)
      // 修改历史操作长度
      historyParams.length = history.length
    }
    // 将当前操作放入记录数组
    history.push(JSON.stringify(store.state.dWidgets))
    // 选中的组件 ID 放入记录数组
    uuidHistory.push(store.state.dActiveElement.uuid)
    // 当前容器数据存入记录数组
    pageHistory.push(JSON.stringify(store.state.dPage))

    // 我们限定历史记录最多存 10 条
    if (history.length > 10) {
      history.splice(0, 1)
      uuidHistory.splice(0, 1)
      pageHistory.splice(0, 1)
    }
    // 如果页面历史的长度比历史长度长 2，删掉一个记录
    if (pageHistory - 1 > history.length) {
      pageHistory.splice(0, 1)
    }
    // 记录的 index 比历史长度小 1，长度相等
    historyParams.index = history.length - 1
    historyParams.length = history.length
  },
  /**
   * 操作历史记录
   * action为undo表示撤销
   * action为redo表示重做
   */
  handleHistory (store, action) {
    let history = store.state.dHistory
    let uuidHistory = store.state.dActiveUuidHistory
    let pageHistory = store.state.dPageHistory
    let historyParams = store.state.dHistoryParams

    let uuid = '-1'

    // 进行撤销操作
    if (action === 'undo') {
      // 下标向前移动一位
      historyParams.index -= 1
      // 如果下标 >= 0，直接取出历史记录
      if (historyParams.index >= 0) {
        store.state.dWidgets = JSON.parse(history[historyParams.index])
        store.state.dPage = JSON.parse(pageHistory[historyParams.index + 1])
        uuid = uuidHistory[historyParams.index]
      } else if (historyParams.length < 10) {
        // 否则如果历史记录长度小于10，则设置组件为空
        historyParams.index = -1
        store.state.dWidgets = []
        store.state.dPage = JSON.parse(pageHistory[0])
      } else {
        historyParams.index = -1
      }
    }
  }
}

export default {
  state,
  actions,
  getters
}
