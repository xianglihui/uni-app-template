<template>
  <view>
    首页
    <view @click="go">查看购物车</view>
    <!-- 底部菜单 -->
    <u-tabbar
      v-model="current"
      :list="tabList"
      active-color="#F82F48"
      inactive-color="#666666"
    ></u-tabbar>
  </view>
</template>

<script>
import { GetUserInfoHandler } from "@/common/js/loginHandler.js";
export default {
  data() {
    return {
      current: 0,
      tabList: [
        {
          iconPath: require("@/static/img/tabbar/icon_index@2x.png"),
          selectedIconPath: require("@/static/img/tabbar/icon_index_sel@2x.png"),
          text: "首页",
          count: 0,
          pagePath: "/pages/index/index",
        },
        {
          iconPath: require("@/static/img/tabbar/icon_fl@2x.png"),
          selectedIconPath: require("@/static/img/tabbar/icon_fl_sel@2x.png"),
          text: "分类",
          pagePath: "/pages/classify/index",
        },
        {
          iconPath: require("@/static/img/tabbar/icon_gwc@2x.png"),
          selectedIconPath: require("@/static/img/tabbar/icon_gwc_sel@2x.png"),
          text: "购物车",
          customIcon: false,
          pagePath: "/pages/shopping/index",
        },
        {
          iconPath: require("@/static/img/tabbar/icon_mine@2x.png"),
          selectedIconPath: require("@/static/img/tabbar/icon_mine_sel@2x.png"),
          text: "我的",
          pagePath: "/pages/my/index",
        },
      ],
    };
  },
  onLoad() {
    // GetUserInfoHandler(this)
  },
  methods: {
    async go() {
      await this.isLogin();
      // 剩余逻辑xxx
    },
    // 按钮级别登录控制
    isLogin() {
      return new Promise((reslove, reject) => {
        if (!this.$store.getters.token) {
          //未登录
          this.$Router.push({ name: "Login", params: { back: true } });
          return false;
        }
        reslove(!!this.$store.getters.token);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
