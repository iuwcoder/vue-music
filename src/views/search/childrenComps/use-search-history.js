import { save, clear } from '@/assets/js/array-store'
import { SEARCH_KEY} from '@/assets/js/constant'
import { useStore } from 'vuex';

export default function useSearchHistory() {
  const maxLen = 200
  const store = useStore()

  function saveSearch(query) {
    // 保留到本地
    const searches = save(query, SEARCH_KEY, (item) => {
      return item === query
    }, maxLen)
    store.commit('setSearchHistory', searches)
  }

  // 清空
  function clearSearch() {
    const searches = clear(SEARCH_KEY)
    store.commit('setSearchHistory', searches)
  }

  return {
    saveSearch,
    clearSearch
  }
}