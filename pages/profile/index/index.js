// pages/profile/profile.js
const app = getApp()
import {
  formatTime,
  showToast,
  login
} from '../../../utils/util'

import {
  getUserInfo,
  getSignUpInfo,
  getAppointTime,
  getNotice,
  checkNotice,
  checkStatus,
  userSign,
  messagecheck
} from '../../../service/profile'
import { H_config, BASE_URL } from '../../../service/config'

Page({
  data: {
    btns: [
      {
        icon: 'news',
        title: '工作室介绍',
        route: '/subPages/studio/studio',
        content: '点击了解我吧~'
      },
      {
        icon: 'message',
        title: '招新公告',
        route: '/pages/profile/group/group',
        content: '查看招新流程等信息'
      },
      {
        icon: 'edit',
        title: '签到',
        route: '/pages/profile/signed/signed',
        content: '点击签到等待面试'
      },
      {
        icon: 'time',
        title: '预约',
        route: '/pages/profile/reservation/reservation',
        content: '预约下一轮面试'
      },
    ],
    notice: [],
    noticeContent: '',
    modalName: '',
    dialog: false,
    cardBottom: null,
    flagBottom: null,
    unReadNoticeNum: app.globalData.unReadNotice,
    date: '2021-02-18 周四',
    userInfo: getApp().globalData.userInfo,
    time: '上午好',
    isLogin: wx.getStorageSync('token'),
    // isSignUp: app.globalData.isSignUp
    isSignUp: null
  },
  onLoad: function (options) {
    // 计算装四个按钮容器的高度
    
    wx.createSelectorQuery().select('.card').boundingClientRect().selectViewport().scrollOffset().exec(res => {
      this.setData({
        cardBottom: res[0].bottom
      })
    })
    wx.createSelectorQuery().select('.flag').boundingClientRect().selectViewport().scrollOffset().exec(res => {
      this.setData({
        flagBottom: res[0].bottom
      })
    })
    // 适应平板
    wx.createSelectorQuery().select('.action').boundingClientRect().selectViewport().scrollOffset().exec(res => {
      if(res[0].width > 150) {
        this.setData({
          action: true
        })
      }
    })

    
    // 解决app的异步执行，导致数据渲染不出
    app.isSignUpCallback = this.onShow_self
    app.getUserInfoCallback = (res) => {
      console.log(res);
      this.setData({
        // userInfo: app.globalData.userInfo,
        userInfo: res,
        // isSignUp: app.globalData.isSignUp,
        // isLogin: wx.getStorageSync('token')
      })
    }
  },
  // 监测主页面上的未读消息数量
 onShow(){
    console.log(getApp().globalData);
    messagecheck().then(res => {
      this.setData({
        unReadNoticeNum: res.data.data,
      })
    })
    console.log(app.globalData);
    if(app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }
    this.setData({
      // userInfo: app.globalData.userInfo,
      // userInfo: getApp().globalData.userInfo,
      isSignUp: app.globalData.isSignUp,
      isLogin: wx.getStorageSync('token')
    })
  },
  async onShow_self() {
    this.setData({
      // userInfo: app.globalData.userInfo,
      isSignUp: app.globalData.isSignUp,
      isLogin: wx.getStorageSync('token')
    })
    const time = new Date()
    let day = ''
    switch(time.getDay()) {
      case 0: day = '日'; break;
      case 1: day = '一'; break;
      case 2: day = '二'; break;
      case 3: day = '三'; break;
      case 4: day = '四'; break;
      case 5: day = '五'; break;
      case 6: day = '六'; break;
    }
    
    const hour = time.getHours()
    if (hour >= 6 && hour < 11) {
      this.setData({
        time: '早上好'
      })
    } else if (hour >= 11 && hour < 13) {
      this.setData({
        time: '中午好'
      })
    } else if (hour >= 13 && hour < 18) {
      this.setData({
        time: '下午好'
      })
    } else {
      this.setData({
        time: '晚上好'
      })
    }

    this.setData({
      date: formatTime(time).split(' ')[0] + ' 周' + day,
      isLogin: wx.getStorageSync('token') ? true : false
    })
  },
  navigate(e) {
    let route = e.currentTarget.dataset.route
    if(!wx.getStorageSync('token') && (route === '/pages/profile/progress/progress' || route === '/pages/profile/reservation/reservation' || route === '/pages/message/message' || route === '/pages/profile/signed/signed')) {
      login()
    } else if ((route === '/pages/profile/progress/progress' || route === '/pages/profile/reservation/reservation' || route === '/pages/message/message') && !this.data.isSignUp) {
      showToast('请先报名后再查看~')
    } else if (route === '/pages/profile/reservation/reservation') {
      // wx.request({
      //   url: BASE_URL + '/appoint/selectTime',
      //   method: 'post',
      //   data: {
      //     userId: wx.getStorageSync('userId'),
      //     direction: wx.getStorageSync('direction')
      //   },
      //   header: {
      //     'content-type': 'application/x-www-form-urlencoded',
      //     'token': wx.getStorageSync('token')
      //   },
      //   success: res => {
      //     if(res.data.code === 1500) {
      //       showToast('当前阶段无可预约时间')
      //     } else {
      //       wx.navigateTo({
      //         url: route
      //       })
      //     }
      //   }
      // })
      wx.navigateTo({
        url: route
      })
    } else if (route === '/pages/profile/signed/signed') {

      checkStatus().then(({data}) => {
        console.log(data);
        if(!data.data.allowSignIn && !data.data.isSignIn) {
          // 未开发签到
          showToast('当前未开放签到功能')
        } else if (data.data.isSignIn) {
         // 此时已签到
          showToast(`已签到,目前排在第${data.data.listIndex}位`)
        } else if(data.data.allowSignIn) {
          this.setData({
            modalName: 'Modal'
          })
        }
      })
    } else {
      wx.navigateTo({
        url: route
      })
    }
  },
  showModal(e) {
    if(wx.getStorageSync('token')) {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      login()
    }
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  // 签到
  goSigned() {
    console.log(11);
    const tempId = '2DJKw__SrskrMQd1sosfneFITtBgBkSNHommFJ8SK2E'
    wx.requestSubscribeMessage({
      tmplIds: [tempId],
      success: (res) => {
        // 允许授权
        if(res[tempId] == 'accept') {
          userSign().then(({data}) => {
            console.log(data);
          })
        } else {
          // 不允许授权
          showToast('签到失败')
        }
        console.log(res);
        
      },
      fail: (err) => {
        console.log(err);
        showToast('签到失败')
      },
      complete: () => {
        setTimeout(() => {
          this.setData({
            modalName: null
          })
        }, 1000)
       
      }

    })
  },
  
  toLogin() {
    login()
  },
  toSignUp() {
    wx.navigateTo({
      url: '/subPages/direction/direction',
    })
  },
  onPullDownRefresh() {
    this.onShow_self().then(() => {
      console.log('haahahaha');
      wx.stopPullDownRefresh()
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