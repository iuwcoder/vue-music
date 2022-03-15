<template>
  <div class="search">
    <enter-input v-model="query"></enter-input>
    <scroll class="content" ref="scrollRef">
      <div>
        <div class="search-history" v-show="searches.length && !query">
          <div class="title">
            <span>搜索历史</span>
            <div class="icon" @click="showConfirm">
              <i class="iconfont icon-shanchu"></i>
            </div>
          </div>
          <confirm
            ref="confirmRef"
            text="是否清空所有搜索历史？"
            confirm-btn-text="清空"
            @confirm="clearSearch"
          ></confirm>
          <ul>
            <li
              class="history"
              v-for="item in searches"
              :key="item.id"
              @click="addQuery(item)"
            >
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
        <div class="search-content" v-show="!query">
          <div class="title">热门搜索</div>
          <div class="hot">
            <div
              class="item"
              v-for="(item, index) in hotList"
              :key="index"
              :class="{ topSearch: index <= 2 }"
              @click="addQuery(item.first)"
            >
              <div class="num" :class="{ color: index <= 2 }">
                {{ index + 1 }}
              </div>
              <div class="text">{{ item.first }}</div>
            </div>
          </div>
        </div>
        <div class="search-detail" v-show="query">
          <suggest :query="query"></suggest>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import EnterInput from "@/components/context/enterInput/EnterInput.vue";
import Suggest from "./childrenComps/Suggest.vue";
import scroll from "components/common/scroll/scroll.vue";
import Confirm from "@/components/common/confirm/confirm.vue";

import { getSearchHot } from "network/search";

import { ref, computed } from "vue";
import { useStore } from "vuex";
import useSearchHistory from "./childrenComps/use-search-history";

export default {
  name: "Search",
  components: {
    EnterInput,
    Suggest,
    scroll,
    Confirm,
  },
  setup() {
    const query = ref("");
    const hotList = ref([]); //热搜
    const confirmRef = ref(null);

    const store = useStore();
    const searches = computed(() => store.state.searchHistory);

    const { saveSearch, clearSearch } = useSearchHistory();

    getSearchHot().then((res) => {
      console.log(res);
      hotList.value = res.data.result.hots;
    });

    // 添加到搜索框
    function addQuery(s) {
      query.value = s;
      saveSearch(query.value);
    }

    function showConfirm() {
      confirmRef.value.show();
    }

    return {
      query,
      hotList,
      searches,
      confirmRef,
      addQuery,
      showConfirm,
      clearSearch,
    };
  },
  methods: {
    back() {
      this.$router.push("/discover");
    },
  },
};
</script>
<style lang="scss" scoped>
.search {
  background-color: $color-bgc1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  .color {
    color: red !important;
  }
  .topSearch {
    font-weight: 550 !important;
  }
  .content {
    height: 100%;
    overflow: hidden;
    .search-history {
      margin: 15px;
      .title {
        font-size: 16px;
        .icon {
          float: right;
          .icon-shanchu {
            font-size: 20px;
            color: $color-text1;
          }
        }
      }
      .history {
        display: inline-block;
        padding: 8px 10px;
        margin: 15px 20px 0 0;
        border-radius: 20px;
        background-color: rgb(233, 233, 233);
        font-size: 14px;
        color: $color-text;
      }
    }
    .search-content {
      .title {
        width: 100%;
        font-size: 16px;
        margin: 15px 0 15px 15px;
      }
      .hot {
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        box-shadow: $boxshaow;
        border-radius: 8px;
        margin: 10px auto;
        justify-content: space-evenly;
        .item {
          width: 45%;
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          display: flex;
          .num {
            width: 10%;
            height: 100%;
            color: $color-text1;
            margin: 0 10px;
          }
          .text {
            width: 90%;
            height: 100%;
            color: $color-text;
            @include no-wrap();
          }
        }
      }
    }
  }
}
</style>
