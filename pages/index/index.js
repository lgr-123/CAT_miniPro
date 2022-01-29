// index.js
const app = getApp();
Page({
  data: {

  },

  onLoad() {
    wx.login({

      success(res) {
        console.log(res);
      }
    })
  },

  onShow() {
    console.log(111);
  },
  onHide() {
   
  },
  handleRefuse() {
   
  }
})