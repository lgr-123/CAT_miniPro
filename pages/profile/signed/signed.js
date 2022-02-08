// pages/profile/signed/signed.js
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  goSigned() {
    console.log(11);
    wx.requestSubscribeMessage({
      tmplIds: ['2DJKw__SrskrMQd1sosfneFITtBgBkSNHommFJ8SK2E'],
      success: (res) => {
        console.log(res);
      }
    })
  }

  
})