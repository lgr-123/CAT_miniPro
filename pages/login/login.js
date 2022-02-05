// pages/WCH/login/login.js
import {
  login,
  getSignUpInfo
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
    code: null
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
        // app.globalData.userInfo.avatarUrl = e.userInfo.avatarUrl
        // app.globalData.userInfo.nickName = e.userInfo.nickName
        app.globalData.userInfo = e.userInfo
        // 暂时修改
        app.globalData.isSignUp = false
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
              wx.navigateBack()
    /*
              getSignUpInfo({
                userId: id
              }).then(res => {
                if(res.data && res.data.code && res.data.code === H_config.STATUSCODE_getSignUpInfo_SUCCESS) {
                  wx.setStorageSync('direction', res.data.data.direction)
                  app.globalData.isSignUp = true
                  app.globalData.userInfo = res.data.data
                  // wx.getUserInfo({
                  //   success: res => {
                  //     app.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
                  //     wx.showToast({
                  //       title: '登录成功',
                  //       duration: 1000
                  //     })
                  //     setTimeout(() => {
                  //       wx.navigateBack()
                  //     }, 100)
                  //   }
                  // })
                } else {
                  // app.globalData.isSignUp = false
                  wx.showToast({
                    title: '登录成功',
                    duration: 1000
                  })
                  setTimeout(() => {
                    wx.navigateBack()
                  }, 100)
                }
                wx.hideLoading()
              }).catch((err) => {
                console.log(err);
              })

              */
            
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