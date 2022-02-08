// pages/singup/signup.js
import {stuFormSubmit, getMajor, getCollege} from '../../service/profile'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuName: '',
    stuNum: '',
    phoneNum: '',
    stuSex: false,
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
    checkName: false,
    showName: false,
    checkNum: false,
    showNum: false,
    checkPhone: false,
    showPhone: false,
    checkClass: false,
    showClass: false,
    checkIntro: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getCollege().then(({data}) => {
      console.log(data);
      this.setData({
        stuCollegeRange: data.data,
        stuMajorRange: data.data[0].majors,
        stuCollege: data.data[0].name,
        stuMajor: data.data[0].majors[0].name
      })
    }).catch(res => {
      console.log(res);
    })

   
  },
  getInput(e) {
    console.log(e);
    const {type} = e.currentTarget.dataset
    this.setData({
      [type]:e.detail.value
    })
  },

  getSex(e) {
    // console.log(e);
    this.setData({
      stuSex: e.detail.value
    })
  },
  
 

  checkPage1() {
    this.setData({
      showName: true,
      showNum: true,
      showPhone: true
    })
    const {checkName, checkNum, checkPhone, stuSex} = this.data
    if(checkName && checkNum && checkPhone && stuSex) {
     
    }
    console.log(this.data.stuMajor);
    console.log(this.data.stuCollege);
    this.setData({
      showPage1: false,
      showPage2: true
    })
  },

  selectCollege(e) {
    // console.log(e);
    const value = e.detail.value
    this.setData({
      stuCollege: this.data.stuCollegeRange[value].name,
      stuMajor: this.data.stuCollegeRange[value].majors[0].name,
      CollegeIndex: value,
      stuMajorRange: this.data.stuCollegeRange[value].majors
    })

  },
  selectMajor(e) {
    // console.log(e);
    const value = e.detail.value
    this.setData({
      stuMajor: this.data.stuMajorRange[value].name,
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
    this.setData({
      showName: true
    })
  },
  numberReg(){
    const reg = /^3(1|2)2\d{7}$/
    if(reg.test(this.data.stuNum.trim())){
      this.setData({
        checkNum: true
      })
    }else{
      this.setData({
        checkNum: false
      })
    }
    this.setData({
      showNum: true
    })
  },
  classReg(){
    if(this.data.classNum.trim() !== ''){
      this.setData({
        checkClass: true
      })
    }else{
      this.setData({
        checkClass: false
      })
    }
    this.setData({
      showClass: true
    })
  },
  phoneReg(){
    const reg = /^(?:(?:\+|00)86)?1\d{10}$/
    if(reg.test(this.data.phoneNum.trim())){
      this.setData({
        checkPhone: true
      })
    }else{
      this.setData({
        checkPhone: false
      })
    }
    this.setData({
      showPhone: true
    })
  },

  introReg() {
    if(this.data.stuIntro.trim() !== '') {
      this.setData({
        checkIntro: true
      })
    } else {
      this.setData({
        checkIntro: false
      })
    }
  },

  formSubmit() {
    // console.log(this.data.stuName);
    console.log(111);
    if(!this.data.showClass) {
      this.setData({
        showClass: true
      })
    }
    console.log(this.data.checkClass, this.data.checkIntro);
   if(this.data.checkClass && this.data.checkIntro) {
    const {stuName, stuNum, stuCollege, stuMajor, phoneNum, classNum, stuIntro, stuSex} = this.data
    stuFormSubmit({
      name: stuName,
      studentId: stuNum,
      clazz: classNum,
      college: stuCollege,
      major: stuMajor,
      phoneNumber: phoneNum,
      selfIntroduction: stuIntro,
      gender: stuSex,
      direction: '',
    }).then((res) => {
      console.log(res);
    })  
   }
    
  },

  
})