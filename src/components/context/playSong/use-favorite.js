import { useStore } from "vuex"
import { computed } from "vue"
import { save, remove } from "@/assets/js/array-store"
import { FAVORITE_KEY } from "@/assets/js/constant"

export default function useFavorite() {
  const store = useStore()
  const favoriteList = computed(() => store.state.favoriteList)
  const maxLen = 100

  function getFavoriteIcon(song) {
    return isFavorite(song) ? 'icon-shixin' :'icon-xin'
  }

  // 添加/移除收藏歌曲
  function toogleFavorite(song) {
    let list
    if (isFavorite(song)) {
      //remove
      list = remove(FAVORITE_KEY, compare)
    } else {
      //save
      list = save(song, FAVORITE_KEY, compare, maxLen)
    }
    store.commit('setFavoriteList', list)

    // 比对歌曲是否在列表
    function compare(item) {
      return item.id === song.id
    }
  }

  // 判断歌曲是否在列表中
  function isFavorite(song) {
    return favoriteList.value.findIndex((item) => {
      return item.id === song.id
    }) > -1
  }

  return {
    getFavoriteIcon,
    toogleFavorite
  }
}