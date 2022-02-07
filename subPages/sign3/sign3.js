// pages/singup/signup.js
import {stuFormSubmit} from '../../service/profile'
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
    stuFormSubmit({})
   
  },

  
})