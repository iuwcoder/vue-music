<template>
  <div class="more-singer" v-loading="!singerList.length">
    <menu-nav class="menu-nav" :navTitle="'歌手分类'"></menu-nav>
    <scroll class="singer-content">
      <div>
        <div class="top-nav">
          <div class="box">
            <table class="to-table">
              <tr>
                <td
                  v-for="(item, index) in itemList"
                  :key="index"
                  @click="itemClick(index)"
                  :class="{ active: aIndex === index }"
                >
                  {{ item }}
                </td>
              </tr>
              <tr>
                <td
                  v-for="(item, index) in typeList"
                  :key="index"
                  @click="typeClick(index)"
                  :class="{ active: tIndex === index }"
                >
                  {{ item }}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="title">热门歌手</div>
        <div class="content">
          <div
            class="singer"
            v-for="(item, index) in singerList"
            :key="index"
            @click="toSinger(item.accountId)"
          >
            <div class="pic">
              <img v-lazy="item.picUrl" alt="" />
            </div>
            <div class="name">{{ item.name }}</div>
            <div class="more">
              <div class="btn">关 注</div>
            </div>
          </div>
        </div>
      </div>
    </scroll> 
  </div>
</template>

<script>
import MenuNav from "@/components/common/menuNav/MenuNav.vue";
import scroll from "components/common/scroll/scroll.vue";

import { getSinger } from "network/discover";

export default {
  name: "moreSinger",
  components: {
    MenuNav,
    scroll,
  },
  data() {
    return {
      itemList: ["华语", "欧美", "韩国", "日本", "其他"],
      typeList: ["男", "女", "乐队/组合"],
      offset: 0,
      singerList: [],
      aIndex: 0,
      tIndex: 0,
      firstNavIndex: 7,
      secondNavIndex: 1,
    };
  },
  methods: {
    // 导航栏一切换
    itemClick(index) {
      if (this.aIndex !== index) {
        switch (index) {
          case 0: // 华语
            this.firstNavIndex = 7; // 导航栏一索引
            this.offset = 0; // 清空分页参数
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          case 1: // 欧美
            this.firstNavIndex = 96; // 导航栏一索引
            this.offset = 0; // 清空分页参数
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          case 2: // 韩国
            this.firstNavIndex = 16; // 导航栏一索引
            this.offset = 0; // 清空分页参数
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          case 3: // 日本
            this.firstNavIndex = 8; // 导航栏一索引
            this.offset = 0; // 清空分页参数
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          case 4: // 其他
            this.firstNavIndex = 0; // 导航栏一索引
            this.offset = 0; // 清空分页参数
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          default:
            break;
        }
        this.aIndex = index;
      }
    },
    // 导航栏二切换
    typeClick(index) {
      if (this.tIndex !== index) {
        switch (index) {
          case 0: // 男歌手
            this.offset = 0;
            this.secondNavIndex = 1;
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          case 1: // 女歌手
            this.offset = 0;
            this.secondNavIndex = 2;
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          case 2: // 乐队
            this.offset = 0;
            this.secondNavIndex = 3;
            this.singerList = []; // 清空数组
            this.toggleDetail(this.secondNavIndex, this.firstNavIndex); // 调用函数
            break;
          default:
            break;
        }
        this.tIndex = index;
      }
    },

    /*
      7华语   1:男歌手
      96欧美  2:女歌手
      8:日本  3:乐队
      16韩国
      0:其他     
     */
    // 发送请求
    toggleDetail(type, area) {
      // this.$loading.loadingShow();
      getSinger(30, this.offset * 30, type, area).then((res) => {
        for (const item of res.data.artists) {
          this.singerList.push({
            accountId: item.accountId || item.id,
            picUrl: item.picUrl,
            name: item.name,
          });
        }
        // setTimeout(() => {
        //   this.$loading.loadingNo();
        // }, 500);
      });
    },

    // 歌手页面跳转
    toSinger(id) {
      this.$router.push("/Detail/" + id);
    },
  },
  created() {
    // 默认显示华语男歌手
    getSinger(30, this.offset * 30, 1, 7).then((res) => {
      for (const item of res.data.artists) {
        this.singerList.push({
          accountId: item.accountId || item.id,
          picUrl: item.picUrl,
          name: item.name,
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.more-singer {
  height: 100vh;
  width: 100%;
  .active {
    color: red;
  }
  .singer-content {
    height: 100%;
    overflow: hidden;
    // .menu-nav {
    //   position: fixed;
    //   top: 0;
    //   left: 0;
    //   right: 0;
    // }
    .top-nav {
      // margin-top: 44px;
      width: 100%;
      height: 80px;
      display: flex;
      align-items: center;
      background-color: #fff;
      .box {
        .to-table {
          margin-left: 5px;
          font-size: 14px;
          tr {
            height: 30px;
            td {
              width: 70px;
              line-height: 30px;
              text-align: center;
            }
          }
        }
      }
    }
    .title {
      width: 100%;
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      text-indent: 10px;
      color: rgb(131, 131, 131);
    }
    .content {
      width: 100%;
      background-color: #fff;
      .singer {
        width: 100%;
        height: 50px;
        padding: 12px 10px;
        display: flex;
        .pic {
          flex: 1.5;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }
        .name {
          flex: 6;
          line-height: 50px;
          font-size: 15px;
          text-indent: 10px;
        }
        .more {
          flex: 2.5;
          display: flex;
          align-items: center;
          .btn {
            width: 65%;
            height: 25px;
            border-radius: 30px;
            line-height: 25px;
            text-align: center;
            color: #da231b;
            border: solid 1px #da231b;
            font-size: 13px;
            // margin: auto;
          }
        }
      }
    }
  }
}
</style>