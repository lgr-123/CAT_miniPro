// pages/login/login.js
import {login} from '../../service/profile'
import {wxPromise} from '../../utils/utils'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let eventChannel = this.getOpenerEventChannel()
    // eventChannel.on('code', data => {
    //   this.data.code = data.code
    // })
  },

  showLogin() {
   
    wxPromise('getUserProfile', {
      desc: '获取用户信息',
    }).then((res) => {
      console.log(res);
      const encryptedData = e.detail.encryptedData;
      const iv = e.detail.iv;
      login({
        code: this.data.code,
        iv: iv,
        encryptedData: encryptedData
      }).then((res) => {
        
      })
    }).catch((err) => {
      console.log(err);
    })
    
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})