import { useStore } from "vuex";
import { USERSHEET_KEY } from "@/assets/js/constant"
import { save } from "@/assets/js/array-store"

export default function useSheet() {
  const store = useStore()
  const maxLen = 50

  function saveSheet(sheet) {
    const sheets = save(sheet, USERSHEET_KEY, (item)=> {
      return item.id === sheet.id
    }, maxLen)

    store.commit('setUserSheet', sheets)
  }

  return {
    saveSheet
  }
}