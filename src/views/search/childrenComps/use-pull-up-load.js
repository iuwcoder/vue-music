import BScroll from "@better-scroll/core";
import PullUp from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/slide";
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from "vue";

BScroll.use(PullUp)
BScroll.use(ObserveDOM)

// 此钩子并不知道你异步请求的逻辑，可以将这个逻辑作为参数从外部传进来 requsetData
export default function usePullUpLoad(requsetData) {
  const scroll = ref(null) 
  const rootRef = ref(null) //根节点DOM
  const isPullUpLoad = ref(false) //控制拉取过程

  onMounted(() => {
    const scrollVal = scroll.value = new BScroll(rootRef.value, {
      pullUpLoad: true,
      observeDOM: true,
      click: true
    })

    scrollVal.on('pullingUp', pullingUpHandler) //监听

    async function pullingUpHandler() {
      if (preventPullUpLoad.value) {
        scrollVal.finishPullUp()
        return
      }
      isPullUpLoad.value = true
      await requsetData()
      scrollVal.finishPullUp()
      scrollVal.refresh()
      isPullUpLoad.value = false
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
  })

  onDeactivated(() => {
    scroll.value.disable()
  })

  return {
    scroll,
    rootRef,
    isPullUpLoad

  }
}