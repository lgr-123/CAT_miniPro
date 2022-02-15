// pages/WCH/login/login.js
import {
  login,
  getSignUpInfo,
  updateUserInfo,
  checkEnroll
} from '../../service/profile'

import {
  wxPromise
} from '../../utils/util'

import {
  H_config
} from '../../service/config'

const app = getApp()

Page({
  data: {
    code: null,
    nickName: '',
    avatarUrl: ''
  },
  onLoad: function (options) {
    let eventChannel = this.getOpenerEventChannel()
    eventChannel.on('code', data => {
      this.data.code = data.code
    })
  },
  showLogin(e) {
    wxPromise('getUserProfile', {
      desc: '获取用户信息',
    }).then((e) => {
      console.log(e);
      this.setData({
        nickName: e.userInfo.nickName,
        avatarUrl: e.userInfo.avatarUrl
      })

        // console.log(e);
      
     
        app.globalData.userInfo = e.userInfo
          const encryptedData = e.encryptedData;
          const iv = e.iv;
          wx.showLoading({
            title: '正在登录中...',
            icon: 'loading',
            mask: true
          })
          login({
            code: this.data.code,
            encryptedData: encryptedData,
            iv: iv
          }).then(res => {
            console.log(res);
            const id = res.data.data.id
            const token = res.data.data.token
              wx.setStorageSync('token', token)
              // wx.setStorageSync('userId', id)
              wx.hideLoading()
              checkEnroll().then(({data}) => {
                // console.log(res);
               app.globalData.isSignUp = data.data.isEnroll
               updateUserInfo({
                nickName: this.data.nickName,
                avatarUrl: this.data.avatarUrl
              }).then((res) => {
                console.log(res);
                wx.navigateBack()
              })
              })
             
    
          }).catch(err => {
            console.log(err);
          })
        
      
    }).catch(() => {
      showToast('登录失败')
    })
   
    
  },
  onShareAppMessage(options) {
    return {
      title: 'CAT Studio',
      path: '/subPages/studio/studio',
      imageUrl: '/assets/img/catlogo.jpg'
    }
  }
})