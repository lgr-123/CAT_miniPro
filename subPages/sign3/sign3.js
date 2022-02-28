// pages/singup/signup.js
import {stuFormSubmit, getMajor, getCollege} from '../../service/profile'

import {showToast} from '../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuName: '',
    stuNum: '',
    phoneNum: '',
    stuSex: '男',
    stuCollege: '',
    stuMajor: '',
    classNum: '',
    stuIntro: '',
    direction: '',
    showPage1: true,
    showPage2: false,
    showPage3: false,
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
    showIntro: false,
    animation1: '',
    animation11: '',
    animation2: '',
    animation22: '',
    animation3: '',
    animation33: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.key);
    this.setData({
      direction: options.key
    })
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
    // console.log(e);
    const {type} = e.currentTarget.dataset
    this.setData({
      [type]:e.detail.value
    })
  },

  getSex(e) {
    console.log(e);
    this.setData({
      stuSex: e.detail.value
    })
  },
  
 //<view class="confirm" bindtap="{{showPage3? 'formSubmit' : (showPage2 ? 'checkPage1' : 'formSubmit')}}">确定</view>

  checkPage1() {
    this.setData({
      showName: true,
      showNum: true,
      showPhone: true,
      animation11: 'animation-reverse',
      animation2: 'animation-slide-right',
    })
      
      const {checkName ,checkClass, checkNum, checkPhone, stuSex} = this.data
      // && checkNum && checkPhone && stuSex
      if(checkName && checkNum && checkPhone && stuSex) {
        this.setData({
          animation1: 'animation-slide-left' ,
        })

        setTimeout(() => {
          this.setData({
            showPage1: false,
            showPage2: true,
            showPage3: false,
            animation1: '',
            animation11: '',
            animation2: '',
          })
        }, 200)
       
      }
      
      // console.log(this.data.stuMajor);
      // console.log(this.data.stuCollege);
 
    
   
  },
  checkPage2() {
    this.setData({
      showClass: true,
      animation22: 'animation-reverse', 
      animation3: 'animation-slide-right',
      animation33: ''    
    })
    // setTimeout(() => {
      const {checkClass} = this.data
      if(checkClass) {
        this.setData({
          animation2: 'animation-slide-left',
        })
      setTimeout(() => {
        this.setData({
          showPage1: false,
          showPage2: false,
          showPage3: true, 
          animation3: ''
        })
      }, 200)
        
      }
     
      console.log(this.data.stuMajor);
      console.log(this.data.stuCollege);
    // }, 350)
    
   
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
    }else if(this.data.showPage2){
      
      setTimeout(() => {
        this.setData({
          animation11: '' ,
          animation1: '' ,
          animation2: '',
        })
      }, 1);
      setTimeout(() => {
        this.setData({
          animation1: 'animation-slide-left' ,
          animation22: 'animation-reverse',
          animation2: 'animation-slide-right',
        })
      }, 2);
      setTimeout(() => {
        this.setData({
          showPage1: true,
          showPage3: false,
          // animation1: '' 
        })
      }, 50);
      setTimeout(() => {
        this.setData({
          showPage2: false,
          animation1: '' ,
          animation11: '' ,
          animation22: '',
          animation2: '',
        })
      }, 350);
      
      
    } else {
        this.setData({
          animation22: '' ,
          animation2: '' ,
          animation3: ''
        })
        this.setData({
          animation2: 'animation-slide-left' ,
          animation3: 'animation-slide-right',
          animation33: 'animation-reverse',
        })
      setTimeout(() => {
        this.setData({
          showPage1: false,
          showPage2: true,
          showPage3: false,
          animation2: '' 
        })
      }, 200);
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
    this.setData({
      showIntro: true
    })
  },

  formSubmit() {
    // console.log(this.data.stuName);
    console.log(111);
 
      this.setData({
        showIntro: true
      })
    // 延迟一下
    setTimeout(() => {
      console.log(this.data.checkClass, this.data.checkIntro);
      if(this.data.checkClass && this.data.checkIntro) {
       wx.showLoading({
         title: '加载中',
       })
       const {direction ,stuName, stuNum, stuCollege, stuMajor, phoneNum, classNum, stuIntro, stuSex} = this.data
       stuFormSubmit({
         name: stuName,
         studentId: stuNum,
         clazz: classNum,
         college: stuCollege,
         major: stuMajor,
         phoneNumber: phoneNum,
         selfIntroduction: stuIntro,
         gender: stuSex,
         direction: direction,
       }).then(({data}) => {
         console.log(res);
         wx.hideLoading()
         if(data.data.code == 200) {
          wx.reLaunch({
            url: '/subPages/signFinish/signFinish',
          })
         } else {
           showToast('报名失败，请稍后再尝试！')
         }
         
       }).catch(err => {
         wx.hideLoading()
       })
      }
    }, 200)
   
    
  },

  
})