// pages/reservation/reservation.js
import {
  getAppointTime,
  appointTime,
  selectUserAppoint,
  cancelAppoint,
  appointCheck
} from '../../../service/profile'
import {
  H_config
} from '../../../service/config'
import { showToast } from '../../../utils/util'
const app = getApp()

Page({
  data: {
    reservation: [
      // {
      //   time: '1-28 20:30',
      //   direction: '前端组',
      //   progress: '第一轮面试',
      //   num: 3,
      //   maxNum: 5
      // },
      // {
      //   time: '1-28 20:30',
      //   direction: '前端组',
      //   progress: '第一轮面试',
      //   num: 5,
      //   maxNum: 5
      // },
      // {
      //   time: '1-28 20:30',
      //   direction: '前端组',
      //   progress: '第一轮面试',
      //   num: 0,
      //   maxNum: 5
      // }
    ],
    isReservated: false,
    closeappointment: false,
    currentReservation: {},
    userInfo: app.globalData.registerInfo
  },
  onLoad: function (options) {
    this.setData({
      userInfo: app.globalData.registerInfo
    })
    appointCheck().then(res => {
      wx.hideLoading()
      console.log(res);
      if(res.data.code === 1208){
        console.log(1111);
        this._selectUserAppoint()
      }else{
        
        this.setData({
          closeappointment: true
        })
        this._selectUserAppoint()
      }
    })
    
  },
  // 判断用户是否预约
  _selectUserAppoint() {
    selectUserAppoint({
      userId: wx.getStorageSync('userId')
    }).then(res => {
      wx.hideLoading()
      console.log(res);
      if(res.data.code === 1519) {
        let item = res.data.data
        console.log(item);
        this.setData({
          currentReservation: item,
          currentBegin: item.beginTime.slice(5,16),
          currentEnd: item.endTime.slice(5,16),
          isReservated: true
        })
      } else{
        if(res.data.code === 1522){
          this.setData({
            closeappointment: true
          })
        }else{
          this._getAppointTime()
          this.setData({
            isReservated: false
          })
        }
        
      }
    }).catch((err) => {
      console.log(err);
    })
  },
  // _selectUserAppoint() {
  //   selectUserAppoint({
  //     userId: wx.getStorageSync('userId')
  //   }).then(res => {
  //     wx.hideLoading()
  //     if(res.data.code === H_config.STATUSCODE_selectUserAppoint_SUCCESS) {
  //       let item = res.data.data
  //       item.time = item.time.slice(5, 16)
  //       this.setData({
  //         currentReservation: item,
  //         isReservated: true
  //       })
  //     } else if(res.data.code === 1500) {
  //       this._getAppointTime()
  //       this.setData({
  //         isReservated: false
  //       })
  //     } else {
  //       showToast('加载失败')
  //     }
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // },

  // 获取所有预约时间
  _getAppointTime() {
    getAppointTime().then(res => {
      wx.hideLoading()
      console.log(res.data.code);
      if(res.data.code === H_config.STATUSCODE_getAppointTime_SUCCESS) {
        for(let item of res.data.data) {
          item.begintime = item.beginTime.slice(5,19)
          item.endtime = item.endTime.slice(5,19)
          item.number = item.count
          item.limitNumber = item.capacity
        }
        this.setData({
          // reservation: res.data.data,
          reservation: res.data.data.filter(item => item.direction !== this.data.userInfo.direction),
        })
        console.log(this.data.allTime);
      } else if(res.data.code === 1500) {
        showToast('当前阶段无可预约时间')
      } else {
        showToast('加载失败')
      }
    }).catch((err) => {
      wx.hideLoading()
      console.log(err);
    })
  },
  // 预约
  appoint(e) {
    console.log(e);
    const appoint = e.currentTarget.dataset.item.id
    appointTime({
      appointmentId: appoint
    }).then(res => {
      wx.hideLoading()
      console.log(res);
      if(res.data.code === H_config.STATUSCODE_appointTime_SUCCESS) {
        showToast('预约成功', 'success')
        this._selectUserAppoint()
        // this.setData({
        //   isReservated: true,
        //   currentReservation: appoint
        // })
      } else {
        showToast('预约失败')
      }
    }).catch((err) => {
      console.log(err);
    })
  },
  // 取消预约
  _cancelAppoint() {
    wx.showModal({
      // title: '提示',
      content: '确定取消预约？',
      success: res => {
        if(res.confirm) {
          cancelAppoint().then(res => {
            wx.hideLoading()
            if(res.data.code === 1205) {
              wx.showToast({
                title: '取消成功',
              })
              this._getAppointTime()
              this.setData({
                isReservated: false
              })
            } else {
              showToast('取消失败')
            }
          }).catch((err) => {
            console.log(err);
          })
        }
      }
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