<script>
export default {
  onLaunch: function () {
    // openBluetoothAdapter用于管理小程序更新
    if (uni.openBluetoothAdapter) {
      uni.openBluetoothAdapter();
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      uni.showModal({
        title: "提示",
        content:
          "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。",
      });
    }
    console.log("this", this);
    this.updatedApp();
  },
  onShow: function () {
  },
  onHide: function () {
  },
  methods: {
    // 版本更新
    updatedApp() {
      const updateManager = uni.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          uni.showLoading({
            title: "更新下载中...",
          });
        }
      });
      updateManager.onUpdateReady(function () {
        uni.hideLoading();
        uni.showModal({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          },
        });
      });
      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
        uni.hideLoading();
        uni.showToast({
          title: "下载失败,请手动移除小程序后，重新打开小程序",
          icon: "none",
        });
      });
    },
  },
  globalData: {
    
  },
};
</script>

<style lang="scss">
@import "uview-ui/index.scss";
</style>
