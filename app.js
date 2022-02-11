// app.js
import { getSignUpInfo, checkEnroll, getUserInfo, updateToken, checkToken,registerInfo, messagecheck} from './service/profile'
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
          console.log('appappappapp');
          // this.globalData.userInfo = res.data.data
          // wx.getUserInfo({
          //   success: res => {
          //     this.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
          //   }
          // })
          
          // 已经报名，解决index中的页面先加载问题，防止异步
          if (this.isSignUpCallback){
            this.isSignUpCallback(res);
          }
          registerInfo().then(res=>{
            this.globalData.registerInfo = res.data.data
            console.log(this.globalData);
          }).catch(err=>{
            console.log(err);
          })
        } else {
          this.globalData.isSignUp = false
          if (this.isSignUpCallback){
            this.isSignUpCallback(res);
          }
        }
        wx.hideLoading()
      }).catch((err) => {
        console.log(err);
      })
    }
    

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
       
        checkToken().then(({data}) => {
          console.log(data);
          // 未过期
          if(!data.data) {
            // 获取用户的头像和昵称
            getUserInfo().then(({data}) => {
              console.log(data);
              this.globalData.userInfo = data.data
            })
            updateToken().then(({data}) => {
              // console.log(res);
              wx.setStorageSync('token', data.data)
            })
          } else {
            // token过期，清除token
             wx.removeStorageSync('token')
          }
        })
       
    }

    
   

  },
  
  globalData: {
    StatusBar: null,
    Custom: null,
    CustomBar: null,
    userInfo: null,
    isSignUp: null,
    registerInfo: null,
    unReadNotice: null
  },
  
})
