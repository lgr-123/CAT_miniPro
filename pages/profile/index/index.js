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
  userSign
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
    unReadNoticeNum: 0,
    date: '2021-02-18 周四',
    userInfo: app.globalData.userInfo,
    time: '上午好',
    isLogin: wx.getStorageSync('token'),
    isSignUp: app.globalData.isSignUp
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
  },
  async onShow() {
    console.log(app);
    this.setData({
      userInfo: app.globalData.userInfo,
      isSignUp: app.globalData.isSignUp
    })
    console.log(this.data.userInfo);
    

    if(!app.globalData.isSignUp) {
     
    } else {
      if(wx.getStorageSync('userId')) {
        await getSignUpInfo({
          userId: wx.getStorageSync('userId')
        }).then(res => {
          if(res.data && res.data.code && res.data.code === H_config.STATUSCODE_getSignUpInfo_SUCCESS) {
            wx.setStorageSync('direction', res.data.data.direction)
            app.globalData.isSignUp = true
            app.globalData.userInfo = res.data.data
            wx.getUserInfo({
              success: res => {
                app.globalData.userInfo.avatarUrl = res.userInfo.avatarUrl
                this.setData({
                  isSignUp: app.globalData.isSignUp,
                  userInfo: app.globalData.userInfo
                })
              }
            })
          } else {
            app.globalData.isSignUp = false
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

      
      }
    }

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
    if(!wx.getStorageSync('token') && (route === '/pages/profile/progress/progress' || route === '/pages/profile/reservation/reservation')) {
      login()
    } else if ((route === '/pages/profile/progress/progress' || route === '/pages/profile/reservation/reservation') && !this.data.isSignUp) {
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
      this.setData({
        modalName: 'Modal'
      })
      checkStatus().then(({data}) => {
        console.log(data);
        if(!data.data.allowSignIn) {
          // 未开发签到
          showToast('当前未开放签到功能')
        } else if (data.data.isSignIn) {
         // 此时已签到
          showToast('已签到')
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
    wx.requestSubscribeMessage({
      tmplIds: ['2DJKw__SrskrMQd1sosfneFITtBgBkSNHommFJ8SK2E'],
      success: (res) => {
        console.log(res);
        userSign().then(({data}) => {
          console.log(data);
        })
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
  openDialog(e) {
    let notice = this.data.notice.find(item => item.noticeContent === e.currentTarget.dataset.notice)
    if(!notice.stage) {
      checkNotice({
        checked: 1,
        noticeId: notice.noticeId
      }).then(res => {
        wx.hideLoading()
        if(res.data.code !== 1200) {
          showToast('操作失败')
        }
      }).catch((err) => {
        console.log(err);
      })
      notice.stage = 1
      this.data.unReadNoticeNum--
    }
    this.setData({
      noticeContent: e.currentTarget.dataset.notice,
      notice: this.data.notice,
      unReadNoticeNum: this.data.unReadNoticeNum,
      dialog: true
    })
  }, 
  closeDialog() {
    this.setData({
      dialog: false
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
    this.onShow().then(() => {
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