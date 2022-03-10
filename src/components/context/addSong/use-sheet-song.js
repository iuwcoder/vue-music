import { useStore } from "vuex";
import { SHEETSONG_KEY } from "@/assets/js/constant"
import { save } from "@/assets/js/array-store"

export default function useSheetSong() {
  const store = useStore()
  const maxLen = 200

  function saveSheet(song) {
    const songs = save(song, SHEETSONG_KEY, (item)=> {
      return item.id === song.id
    }, maxLen)

    store.commit('setSheetSong', songs)
  }

  return {
    saveSheet
  }
}