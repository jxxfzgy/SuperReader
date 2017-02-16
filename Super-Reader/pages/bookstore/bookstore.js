var api = require('../../utils/api.js')
var app = getApp();
Page({
    data: {
        loading:true,
        item: {}
    },
    onLoad: function () {
        var that = this ;
        api.getCats().then(function (res) {
            that.setData({
                item:res.data,
                loading:false
            })
        }, function (errMsg) {
            that.setData({
                loading:false
            })
        });
    },
    openCate: function (e) {
        var dataset = e.currentTarget.dataset;
        wx.navigateTo({
            url: "../list/list?cateName=" + dataset.name + "&gender=" +dataset.gender
        })
    },
})