// subPages/direction/direction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  goSign(e) {
    // console.log(e);
    // console.log(e.currentTarget.dataset.type);
    const direction = e.currentTarget.dataset.type
    wx.navigateTo({
      url: `/subPages/sign3/sign3?key=${direction}`,
    })
  }
})