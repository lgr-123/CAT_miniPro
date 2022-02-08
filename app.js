// app.js
import { getSignUpInfo, checkEnroll, getUserInfo, updateToken} from './service/profile'
import { H_config } from './service/config'
App({
  onLaunch() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })

    // 判断是否报名
    if(wx.getStorageSync('token')) {
      checkEnroll().then(res => {
        if(res.data && res.data.code && res.data.code === H_config.STATUSCODE_checkEnroll_SUCCESS) {
          // wx.setStorageSync('direction', res.data.data.direction)
          this.globalData.isSignUp = true
          // this.globalData.userInfo = res.data.data
          // wx.getUserInfo({
          //   success: res => {
          //     this.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
          //   }
          // })
        } else {
          this.globalData.isSignUp = false
        }
        wx.hideLoading()
      }).catch((err) => {
        console.log(err);
      })
    }
    // if(wx.getStorageSync('userId')) {
    //   getSignUpInfo({
    //     userId: wx.getStorageSync('userId')
    //   }).then(res => {
    //     if(res.data && res.data.code && res.data.code === H_config.STATUSCODE_getSignUpInfo_SUCCESS) {
    //       wx.setStorageSync('direction', res.data.data.direction)
    //       this.globalData.isSignUp = true
    //       this.globalData.userInfo = res.data.data
    //       wx.getUserInfo({
    //         success: res => {
    //           this.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
    //         }
    //       })
    //     } else {
    //       this.globalData.isSignUp = false
    //     }
    //     wx.hideLoading()
    //   }).catch((err) => {
    //     console.log(err);
    //   })
    // }

    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      },
    })

    // 判断是否授权登录过
    if(wx.getStorageSync('token')) {
        updateToken().then(res => {
          console.log(res);
        })
    }
    getUserInfo().then((res) => {
      console.log(res);
    })

  },
  
  globalData: {
    StatusBar: null,
    Custom: null,
    CustomBar: null,
    userInfo: null,
    isSignUp: null
  }
})
