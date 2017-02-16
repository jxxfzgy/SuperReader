var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
const app = getApp();
Page({
    data: {
        loading:true,
        loadingDetail:true,
        loadingContents:true,
        hasSave:false,
        toast1Hidden:true,
        book:{}
        // book: {
        //     _id: "51d11e782de6405c45000068",
        //     author: "天蚕土豆",
        //     cover: "/agent/http://image.cmfu.com/books/2750457/2750457.jpg",
        //     creater: "iPhone 4S",
        //     longIntro: "大千世界，位面交汇，万族林立，群雄荟萃，一位位来自下位面的天之至尊，在这无尽世界，演绎着令人向往的传奇，追求着那主宰之路。 无尽火域，炎帝执掌，万火焚苍穹。 武境之内，武祖之威，震慑乾坤。 西天之殿，百战之皇，战威无可敌。 北荒之丘，万墓之地，不死之主镇天地。 ...... 少年自北灵境而出，骑九幽冥雀，闯向了那精彩绝伦的纷纭世界，主宰之路，谁主沉浮？ 大千世界，万道争锋，吾为大主宰。",
        //     title: "大主宰",
        //     cat: "异界大陆",
        //     majorCate: "玄幻",
        //     minorCate: "异界大陆",
        //     _le: false,
        //     allowMonthly: false,
        //     allowVoucher: true,
        //     allowBeanVoucher: false,
        //     hasCp: true,
        //     postCount: 174712,
        //     latelyFollower: 378859,
        //     latelyFollowerBase: 0,
        //     followerCount: 63161,
        //     wordCount: 4569853,
        //     serializeWordCount: 2707,
        //     minRetentionRatio: 0,
        //     retentionRatio: "56.48",
        //     updated: "2017-02-09T14:26:00.969Z",
        //     isSerial: true,
        //     chaptersCount: 1437,
        //     lastChapter: "第1476章 变天的浮屠古族",
        //     gender: [
        //         "male"
        //     ],
        //     tags: [
        //         "玄幻",
        //         "热血",
        //         "架空",
        //         "异界大陆",
        //         "巅峰",
        //         "修炼",
        //         "主宰"
        //     ],
        //     donate: false,
        //     copyright: "阅文集团正版授权"
        // }
    }
    ,
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        util.setTitle(options.title)
        const that = this;
        api.bookDetail(options._id).then(function (res) {
            const hasSave = util.hasSave(res.data._id)
            const loadContents = that.data.loadingContents
            const loading = that.checkLoading(false,loadContents);
            console.log(res.data._id)
            that.setData({
                loading: loading,
                book: res.data,
                hasSave: hasSave,
                loadingDetail:false
            })
        }, function (res) {
            const loadContents = that.data.loadingContents
            const loading = that.checkLoading(false,loadContents);
            that.setData({
                loading: loading,
                loadingDetail:false
            })
        });

        api.getContents(options._id).then(function (res) {
            const loadDetail = that.data.loadingDetail
            const loading = that.checkLoading(loadDetail,false);
            console.log(res.data)
            that.setData({
                loading: loading,
                loadingContents: false
            })
            app.globalData.bookContents = res.data;
        }, function (res) {
            const loadDetail = that.data.loadingDetail
            const loading = that.checkLoading(loadDetail,false);
            that.setData({
                loading: loading,
                loadingContents: false
            })
        });
    },
    onReady: function () {
        // 生命周期函数--监听页面初次渲染完成
    },
    onShow: function () {
        // 生命周期函数--监听页面显示
    },
    onHide: function () {
        // 生命周期函数--监听页面隐藏
    },
    onUnload: function () {
        // 生命周期函数--监听页面卸载
        app.globalData.bookContents = null;
    },
    onPullDownRefresh: function () {
        // 页面相关事件处理函数--监听用户下拉动作
    },
    onReachBottom: function () {
        // 页面上拉触底事件的处理函数
    },

    addBookStore:function (e) {
        var book = e.currentTarget.dataset.book;
        // if (this.data.hasSave){
        //     //remove
        //     util.removeBook(e.currentTarget.dataset.book._id)
        // }else {
        // }
        util.saveBook(book);
        var hasSave = !this.data.hasSave;
        this.setData({
            hasSave:hasSave,
            toast1Hidden:false
        })

    },

    readBook:function (e) {
        util.readBook(e);
    },
    toast1Change:function () {
        this.setData({
            toast1Hidden:true
        })
    },
    chapterOpen:function (e) {
        wx.navigateTo({
            url: "../contents/contents?bookId="+e.currentTarget.dataset.id+"&from=detail"
        })
    },

    checkLoading:function (loadingDetail,loadingContents) {
        return loadingDetail||loadingContents
    }


})