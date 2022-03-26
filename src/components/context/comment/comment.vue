<template>
  <div class="comment">
    <menu-nav
      :showBlackImg="false"
      :showWriteImg="true"
      :rightImg="true"
      :navTitle="commentTitle"
    ></menu-nav>
    <div class="nav" v-show="commentList.length">
      <div class="title">评论区</div>
      <switches
        class="switches"
        :items="['推荐', '最热', '最新']"
        v-model="currentIndex"
        @click="changeType(currentIndex)"
      ></switches>
    </div>
    <scroll class="scroll-content">
      <div>
        <div
          class="comment-content"
          v-if="commentList.length"
          v-loading="!commentList.length"
        >
          <div
            class="item-box"
            v-for="(item, index) in commentList"
            :key="index"
          >
            <div class="user-img">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="right">
              <div class="top-box">
                <div class="user-name">
                  {{ item.user.nickname }}
                  <div class="add-time" v-if="currentIndex == 0">
                    {{ $filters.getTime(item.time) }}
                  </div>
                  <div class="add-time" v-else>{{ item.timeStr }}</div>
                </div>
                <div class="liked" @click="likeComment(item)">
                  <div
                    class="count"
                    v-show="item.likedCount !== 0"
                    :class="[item.t == 1 ? 'likeComment' : '']"           
                  >
                    {{ item.likedCount }}
                  </div>
                  <i
                    class="iconfont icon-zan"
                    :class="[item.t == 1 ? 'likeComment' : '']"
                  ></i>
                </div>
              </div>
              <div class="content">
                <span>{{ item.content }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="noComment" v-else>
          <div class="text">暂无评论，欢迎抢沙发</div>
        </div>
      </div>
    </scroll>
    <send-comment
      :type="type"
      :id="$route.params.id"
      @successComment="successComment"
    ></send-comment>
  </div>
</template>

<script>
import MenuNav from "@/components/context/menuNav/MenuNav.vue";
import Switches from "@/components/common/switches/switches.vue";
import SendComment from "./CommentInput.vue";
import Scroll from "components/common/scroll/scroll.vue";

import { getComment, likeComment } from "network/comment"; // 评论请求

export default {
  name: "Comment",
  components: {
    MenuNav,
    Switches,
    SendComment,
    Scroll,
  },
  data() {
    return {
      navTitle: "",
      type: 2, //评论类型
      pageNo: 1, //分页
      pageSize: 20, //分页条数
      sortType: 99, //排序方式
      // commentCount: "", //评论数量
      commentList: [], //评论内容
      currentIndex: 0,
      hasMore: true, //是否有更多评论
      t: 0, //点赞标识
    };
  },
  computed: {
    // 判断评论
    commentTitle() {
      return this.commentList.length
        ? "评论" + "(" + this.commentCount + ")"
        : "评论";
    },
  },
  methods: {
    // 切换推荐
    changeType(index) {
      this.currentIndex = index;
      switch (index) {
        case 0: //推荐
          this.commentList = [];
          this.getCommentList(this.$route.params.id, this.type, 99);
          break;
        case 1: // 最热
          this.commentList = [];
          this.getCommentList(this.$route.params.id, this.type, 2);
          break;
        case 2: //最新
          this.commentList = [];
          this.getCommentList(this.$route.params.id, this.type, 3);
          break;
      }
    },
    // 点赞评论
    likeComment(item) {
      if (item.t == 1) {
        item.t = 0
        likeComment(
        this.$route.params.id,
        item.commentId,
        item.t,
        this.type,
        this.$store.state.cookie).then(res => {
          item.likedCount --
        })
      } else {
        item.t = 1
        likeComment(
          this.$route.params.id,
          item.commentId,
          item.t,
          this.type,
          this.$store.state.cookie).then(res => {
          item.likedCount ++
        })
      }
    },

    // 发表评论
    successComment(commentDetail) {
      this.commentList.unshift(
        commentDetail
        // content: commentDetail.content, // 评论内容
        // likedCount: 0, // 喜欢数量
        // time: commentDetail.time, // 发布时间戳
        // avatarUrl: commentDetail.avatarUrl, // 用户头像
        // nickname: commentDetail.nickname, // 用户昵称
        // userId: commentDetail.id, // 用户id
        // t: commentDetail.t,
      );
    },

    // 评论内容请求
    getCommentList(id, type, sortType, pageNo, pageSize) {
      if (this.$route.params.isType == "0") {
        this.type = 0; // 评论类型--歌曲
        getComment(id, 0, sortType, pageNo, pageSize).then((res) => {
          console.log(res);
          this.commentCount = res.data.data.totalCount;
          this.hasMore = res.data.hasMore
          for (const item of res.data.data.comments) {
            this.commentList.push(item);
          }
        });
      } else if (this.$route.params.isType == "2") {
        this.type = 2; // 评论类型--歌单
        getComment(id, type, sortType, pageNo, pageSize).then((res) => {
          console.log(res);
          this.commentCount = res.data.data.totalCount;
          for (const item of res.data.data.comments) {
            this.commentList.push(item);
          }
        });
      }
    },
  },
  created() {
    this.getCommentList(this.$route.params.id, this.type, this.sortType);
  },
};
</script>

<style lang="scss" scoped>
.likeComment {
  color: $color-red;
}
.comment {
  z-index: 5000;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: $color-bgc1;
  height: 100vh;
  .scroll-content {
    height: 100%;
    overflow: hidden;
  }
  .nav {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 10px 10px 10px;
    .title {
      flex: 4;
      color: $color-text;
      font-size: 15px;
    }
    .switches {
      flex: 2.5;
      border: none;
      width: 100px;
      font-size: 14px;
    }
  }
  .comment-content {
    margin: 10px;
    .item-box {
      display: flex;
      margin-bottom: 10px;
      .user-img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .right {
        flex: 1;
        width: 80%;
        margin-left: 10px;
        padding-bottom: 15px;
        border-bottom: $border-line;
        .top-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 50px;
          .user-name {
            font-size: 15px;
            color: $color-text2;
            width: 90%;
            @include no-wrap();
            .add-time {
              margin-top: 5px;
              font-size: 12px;
              // -webkit-transform-origin-x: 0;
              // -webkit-transform: scale(0.90); //字体变小
              color: $color-text1;
            }
          }
          .liked {
            display: flex;
            align-items: center;
            color: $color-text1;
            .count {
              font-size: 13px;
            }
            .icon-zan {
              margin-left: 5px;
              font-size: 16px;
            }
          }
        }
        .content {
          width: 95%;
          span {
            color: $color-text;
            font-size: 16px;
            line-height: 1.5;
          }
        }
      }
    }
  }
  .noComment {
    margin-top: 50px;
    text-align: center;
    .text {
      font-size: 16px;
      color: $color-text2;
    }
  }
}
</style>