var util = require('../../utils/util.js')
var app = getApp();
var time;
const LONG_TOUCH_TIME = 350;
Page({
    data: {
        loadData: true,
        modalHidden: true,
        touchStart: 0,
        touchEnd: 0,
        selectBookId: "",
        books: [
            // {
            //     _id: "51d11e782de6405c45000068",
            //     author: "天蚕土豆",
            //     cover: "/agent/http://image.cmfu.com/books/2750457/2750457.jpg",
            //     shortIntro: "大千世界，位面交汇，万族林立，群雄荟萃，一位位来自下位面的天之至尊，在这无尽世界，演绎着令人向往的传奇，追求着那主宰之路。 无尽火域，炎帝执掌，万火焚苍穹。 武...",
            //     title: "大主宰",
            //     site: "zhuishuvip",
            //     majorCate: "玄幻",
            //     latelyFollower: 378859,
            //     latelyFollowerBase: 0,
            //     minRetentionRatio: 0,
            //     retentionRatio: 56.48,
            //     lastChapter: "第1476章 变天的浮屠古族",
            //     tags: [
            //         "玄幻",
            //         "热血",
            //         "架空",
            //         "异界大陆",
            //         "巅峰",
            //         "修炼",
            //         "主宰"
            //     ]
            // }
        ]
    },
    onLoad: function () {
        // var localBooks = util.getBook();
        // this.setData({
        //     loadData: false,
        //     books: localBooks
        // })
    },
    onShow: function () {
        // 生命周期函数--监听页面显示
        var localBooks = util.getBook();
        localBooks.sort(function (a,b) {
            return b.time-a.time;
        });
        this.setData({
            loadData: false,
            books: localBooks
        });
        app.globalData.bookContents = null
        console.log("==readBook=onShow======")
    },
    readBook: function (e) {
        if (this.data.modalHidden) {
            util.readBook(e);
        }
    },

    touchStart: function (e) {
        console.log("====touchStart====")
        this.setData({
            touchStart: e.timeStamp,
            touchEnd: 0,
            selectBookId: e.currentTarget.dataset.id
        })
    },
    touchEnd: function (e) {
        this.setData({
            touchEnd: e.timeStamp
        })
    },

    longClick:function (e) {
        this.setData({
            selectBookId: e.currentTarget.dataset.id,
            modalHidden: false
        })
    },
    confirm: function (e) {
        this.removeBook(this.data.selectBookId)
        util.removeBook(this.data.selectBookId)
    },

    cancel: function (e) {
        this.setData({
            modalHidden: true
        })
    },

    searchBook: function (e) {
        wx.navigateTo({
            url: "../search/search"
        })
    },

    removeBook: function (id) {
        var localBooks = this.data.books;
        for (var i = 0; i < localBooks.length; i++) {
            if (id == localBooks[i]._id) {
                localBooks.splice(i, 1);
                this.setData({
                    books: localBooks,
                    modalHidden: true
                })
                return;
            }
        }
    },


});