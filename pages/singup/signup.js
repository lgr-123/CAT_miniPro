// pages/singup/signup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuName: '234',
    stuNum: '',
    phoneNum: '',
    stuSex: '',
    stuCollege: '',
    stuMajor: '',
    classNum: '',
    stuIntro: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getInput(e) {
    const {type} = e.currentTarget.dataset
    this.setData({
      [type]:e.detail.value
    })
  },
  nmaeReg() {
    console.log(1);
  },

  formSubmit() {
    // console.log(this.data.stuName);
   
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