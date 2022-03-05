// cd与歌词切换交互
import { ref } from 'vue'

export default function useMiddleInteractive() {
  const currentShow = ref('cd') //默认显示
  const middleLStyle = ref(null) //cd层样式
  const middleRStyle = ref(null) //歌词层样式

  const touch = {} //保存开始位置
  let currentView = 'cd' //最终位置

  // 开始移动
  function onMiddleTouchStart(e) {
    touch.startX = e.touches[0].pageX //横向
    touch.startY = e.touches[0].pageY //纵向
    touch.directionLocked = '' //方向锁
  }

  // 正在移动
  function onMiddleTouchMove(e) {
    const delatX = e.touches[0].pageX - touch.startX
    const delatY = e.touches[0].pageY - touch.startY
    // 对比绝对值大小
    const absDelatX = Math.abs(delatX)
    const absDelatY = Math.abs(delatY)

    if (!touch.directionLocked) {
      touch.directionLocked = absDelatX >= absDelatY ? 'h' :'v'
    }

    if (touch.directionLocked === 'v') {
      return
    }

    const left = currentView === 'cd' ? 0 : -window.innerWidth
    const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + delatX)) //偏移量
    touch.percent = Math.abs(offsetWidth / window.innerWidth)  //偏移比例

    // 根据比例切换视图
    if (currentView == 'cd') {
      if (touch.percent > 0.2) {
        currentShow.value = 'lyric'
      } else {
        currentShow.value = 'cd'
      }
    } else {
      if (touch.percent < 0.8) {
        currentShow.value = 'cd'
      } else {
        currentShow.value = 'lyric'
      }
    }

    // 修改cd透明度
    middleLStyle.value = {
      opacity: 1 - touch.percent
      // transitonDuration: `0ms`
    }

    // 修改歌词透明度
    middleRStyle.value =  {
      transform: `translate3d(${offsetWidth}px, 0, 0)`
      // transitonDuration: `0ms`
    }
  }

  // 移动后
  function onMiddleTouchEnd() {
    let offsetWidth
    let opacity
    if (currentShow.value === 'cd') {
      currentView = 'cd'
      offsetWidth = 0
      opacity = 1
    } else {
      currentView = 'lyric'
      offsetWidth = -window.innerWidth
      opacity = 0
    }

    const duration = 300
    middleLStyle.value = {
      opacity,
      transitonDuration: `${duration}ms`
    }

    // 修改歌词透明度
    middleRStyle.value =  {
      transform: `translate3d(${offsetWidth}px, 0, 0)`,
      transitonDuration: `${duration}ms`
    }

  }

  return {
    currentShow,
    middleRStyle,
    middleLStyle,
    onMiddleTouchStart,
    onMiddleTouchMove,
    onMiddleTouchEnd

  }
}