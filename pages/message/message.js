// pages/message/message.js
import {
    appointCheck,
    messagelist,
    messageread
  } from '../../service/profile'
  const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stage: [],
        color: ['green', 'orange', 'olive', 'red', 'yellow', 'blue'],
        icon: ['noticefill','form', 'edit', 'commentfill', 'newfill', 'activityfill', 'evaluate_fill'],
        date: ['2022.1.2', '2022.2.1', '2022.3.1'],
        isread: false,
        itemcontent: '',
        anmiation: 'animation-scale-up animation-reverse',
        confirmdata: 0,
        iscanload: false    //数据未加载出来页面不显示
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        messagelist().then(res=>{
            if(res.data.code === 1801){
                this.setData({
                    stage: res.data.data,
                    iscanload: true
                })
            }
            this.setData({
                iscanload: true
            })
            console.log(this.data.stage);
            console.log(res);
            wx.hideLoading()
        }).catch(err => {
            console.log(err);
            wx.hideLoading()
        })
    },

    readOK: function (e){
        console.log(e);
        console.log(this.data.stage[e.target.dataset.confirmdata]);
        console.log(this.data.stage);
        console.log(e.target.dataset.confirmdata);
        if(this.data.stage[e.target.dataset.confirmdata].isRead) return
        console.log(e.target.dataset.itemcontent)
        this.setData({
            confirmdata: e.target.dataset.confirmdata,
            anmiation: 'animation-scale-up',
            itemcontent: e.target.dataset.itemcontent,
            // isread: true,
            modalName: e.currentTarget.dataset.target
        })
    },
    cancelread: function (){
        this.setData({
            anmiation: 'animation-scale-ups animation-reverse',
            isread: false
        })
    },
    confirmread: function (e){
        //调接口
        console.log(this.data.itemcontent);
        console.log(this.data.itemcontent.id);
        let id = this.data.itemcontent.id
        messageread({
            messageId: this.data.itemcontent.id
        }).then(res=>{
            console.log(res);
            this.onLoad()
            console.log(app);
        })
        // console.log(data.confirmdata); 
        // this.data.state[this.data.confirmdata] = '已读'
        this.setData({
            modalName: null
        })
        
        console.log(this.data)
    },


    hideModal(e) {
        this.setData({
            modalName: null
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: 'CAT Studio',
            path: '/subPages/studio/studio',
            imageUrl: '/assets/img/catlogo.jpg'
          }
    },

})