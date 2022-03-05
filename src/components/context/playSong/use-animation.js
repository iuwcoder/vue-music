// cd从全屏到迷你的过渡动画
import { ref } from "vue";
import animations from 'create-keyframe-animation'

export default function useAnimation() {
  const cdWrapperRef = ref(null)
  let entering = false
  let leaving = false


  // 调用done ，vue才会进入到下一个回调函数
  function enter(el, done) {
    // 进入动画未完成可以执行离开动画
    if (leaving) {
      afterLeave()
    }
    entering = true
    const { x, y, scale } = getPosAndScale()
    
    const animation = {
      0: {
        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
      },
      100: {
        transform: 'translate3d(0, 0, 0) scale(1)'
      }
    }

    // 注册animations
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 600,
        easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
      }
    })

    animations.runAnimation(cdWrapperRef.value, 'move', done)
  }

  function afterEnter() {
    entering = false
    // 清理
    animations.unregisterAnimation('move')
    cdWrapperRef.value.animation = ''
  }

  function leave(el, done) {
    // 离开过程中可以执行enter
    if (entering) {
      afterEnter()
    }
    leaving = true
    const { x, y, scale } = getPosAndScale()
    const cdWrappeEl = cdWrapperRef.value

    cdWrappeEl.style.transition = 'all .6s cubic-bezier(0.45, 0, 0.55, 1)'
    cdWrappeEl.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`
    cdWrappeEl.addEventListener('transitionend', next) //绑定transitionend事件

    function next() {
      cdWrappeEl.removeEventListener('transitionend', next) //解绑
      done()
    }
  }

  function afterLeave() {
    leaving = false
    const cdWrappeEl = cdWrapperRef.value
    cdWrappeEl.style.transition = ''
    cdWrappeEl.style.transform = ''

  }

  // 计算偏移量
  function getPosAndScale() {
    const targetWidth = 40  //小cd宽度
    const paddingLeft = 35  //圆心距离左边的距离 15+20
    const paddingBottom = 30 // 圆心距离底部的距离 10+20
    const paddingTop = 80 //大cd到顶部的距离
    const width = window.innerWidth * 0.7 //大cd宽度
    const x = -(window.innerWidth - paddingLeft)  //横坐标偏移量
    const y = window.innerHeight - paddingTop - width/2 - paddingBottom //纵坐标偏移量
    const scale = targetWidth / width //缩放

    return {
      x,
      y,
      scale
    }
  }

  return {
    cdWrapperRef,
    enter,
    afterEnter,
    leave,
    afterLeave
    
  }

}