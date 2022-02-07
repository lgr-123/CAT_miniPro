// pages/singup/signup.js
import {stuFormSubmit, getMajor, getCollege} from '../../service/profile'
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
    stuIntro: '',
    showPage1: true,
    showPage2: false,
    CollegeIndex: 0,
    MajorIndex: 0,
    stuCollegeRange: [],
    stuMajorRange: [],
    checkName: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(111);
    getCollege().then(({data}) => {
      console.log(data);
      this.setData({
        stuCollegeRange: data.data
      })
    }).catch(res => {
      console.log(res);
    })

   
    getMajor({
      name: '计算机学院'
    }).then((res) => {
      // console.log(res);
      this.setData({
        stuMajorRange: res.data.data
      })
      // console.log(res);
    })
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

  checkPage1() {
    this.setData({
      showPage1: false,
      showPage2: true
    })
   
  },

  selectCollege(e) {
    // console.log(e);
    const value = e.detail.value
    this.setData({
      CollegeIndex: value,
      stuMajorRange: this.data.stuCollegeRange[value].majors
    })

  },
  selectMajor(e) {
    // console.log(e);
    const value = e.detail.value
    this.setData({
      MajorIndex: value,
    })
  },
  goBack() {
    if(this.data.showPage1) {
      wx.navigateBack()
    } else {
      this.setData({
        showPage1: true,
        showPage2: false
      })
    }
  },

  // 表单验证
  nameReg(){
    const reg = /^(?:[\u4e00-\u9fa5·]{2,16})$/
    if(reg.test(this.data.stuName.trim())){
      this.setData({
        checkName: true
      })
    }else{
      this.setData({
        checkName: false
      })
    }
  },
  numberReg(){
    const reg = /^3(1|2)2\d{7}$/
    if(!reg.test(this.data.number.trim())){
      this.setData({
        numberTrue:3
      })
    }else{
      this.setData({
        numberTrue:2
      })
    }
  },
  classReg(){
    if(this.data.clazz.trim() == ''){
      this.setData({
        classTrue:3
      })
    }else{
      this.setData({
        classTrue:2
      })
    }
  },
  phoneReg(){
    const reg = /^(?:(?:\+|00)86)?1\d{10}$/
    if(!reg.test(this.data.phone.trim())){
      this.setData({
        phoneTrue:3
      })
    }else{
      this.setData({
        phoneTrue:2
      })
    }
  },


  
})