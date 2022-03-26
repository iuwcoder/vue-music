<template>
  <div class="my-follow" v-loading="!followlist.length">
    <menu-nav :navTitle="'我的关注'"></menu-nav>
    <div class="item-box" v-for="(item, index) in followlist" :key="index">
      <div class="item" @click="detail(item.id)">
        <div class="image">
          <img :src="item.img" alt="" />
          <div class="icon" v-if="item.identity">
            <img :src="item.identity.identityIconUrl" alt="" />
          </div>
        </div>
        <div class="name">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuNav from "@/components/context/menuNav/MenuNav.vue";
import { getUserFollows } from "network/user";

export default {
  name: "myFollow",
  components: {
    MenuNav,
  },
  data() {
    return {
      followlist: [],
    };
  },
  methods: {
    // 跳转到用户详情页面
    detail(id) {
      this.$router.push("/detail/" + id);
    },
  },
  created() {
    getUserFollows(this.$store.state.userId).then((res) => {
      console.log(res);
      for (const item of res.data.follow) {
        this.followlist.push({
          name: item.nickname, //歌单名称
          id: item.userId,
          img: item.avatarUrl, //歌单图片
          identity: item.avatarDetail || null, //身份认证图标
        });
      }
    });
  },
};
</script>

<style lang='scss' scoped>
.my-follow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-bgc1;
  .item-box {
    margin: 10px 0 0 15px;
    .item {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
      .image {
        width: 45px;
        height: 45px;
        position: relative;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
        .icon {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 16px;
          height: 16px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .name {
        margin-left: 10px;
        font-size: 16px;
      }
    }
  }
}
</style>