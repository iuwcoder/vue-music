import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'

export default function useCd() {
  const cdRef = ref(null)
  const cdImageRef = ref(null)

  const store = useStore()
  const playing = computed(() => store.state.playing)

  // 控制旋转
  const cdCls = computed(() => {
    return playing.value ? 'playing' : ''
  })

  // 同步旋转角度
  watch(playing, (newPlaying) => {
    if (!newPlaying) {
      syncTransform(cdRef.value, cdImageRef.value)
    }
  })

  function syncTransform(wrapper, inner) {
    // 计算外层
    const wrapperTransform = getComputedStyle(wrapper).transform
    // 计算内层图片旋转角度  内层旋转是相对于外层的
    const innerTransform = getComputedStyle(inner).transform
    // 叠加内外层旋转角度
    wrapper.style.transform = wrapperTransform === 'none' ? innerTransform : innerTransform.concat(' ', wrapperTransform)
  }

  return {
    cdCls,
    cdRef,
    cdImageRef
  }
}