var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
const app = getApp();
Page({
    data: {
        showResult: false,
        inputValue:"",
        hotWords: [],
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
            // },
            // {
            //     _id: "5816b415b06d1d32157790b1",
            //     title: "圣墟",
            //     author: "辰东",
            //     shortIntro: "在破败中崛起，在寂灭中复苏。 沧海成尘，雷电枯竭，那一缕幽雾又一次临近大地，世间的枷锁被打开了，一个全新的世界就此揭开神秘的一角……",
            //     cover: "/agent/http://qidian.qpic.cn/qdbimg/349573/1004608738/180",
            //     site: "zhuishuvip",
            //     majorCate: "玄幻",
            //     latelyFollower: 223866,
            //     latelyFollowerBase: 0,
            //     minRetentionRatio: 0,
            //     retentionRatio: 70.93,
            //     lastChapter: "呼唤推荐票和月票",
            //     tags: [
            //         "玄幻",
            //         "东方玄幻"
            //     ]
            // }
        ]
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        const that = this;
        api.getHotWorld().then(function (res) {
            const worlds = res.data.hotWords.slice(0, res.data.hotWords.length > 6 ? 6 : res.data.hotWords.length);
            that.setData({
                hotWords: worlds
            })
        })
    },
    onReady: function () {
        // 页面渲染完成
    },
    onShow: function () {
        // 页面显示
    },
    onHide: function () {
        // 页面隐藏
    },
    onUnload: function () {
        // 页面关闭
    },
    inputChange: function (e) {
        if (!e.detail.value.trim()) {
            this.setData({
                showResult: false
            });
        }
    },
    searchSubmit: function (e) {
       this.processSearch(e.detail.value);
    },
    bookDetail: function (e) {
        wx.navigateTo({
            url: "../detail/detail?_id=" + e.currentTarget.dataset.id + "&title=" + e.currentTarget.dataset.title
        })
    },

    hotWorldClick:function (e) {
        this.setData({
            inputValue:e.currentTarget.dataset.tag
        })
        this.processSearch(e.currentTarget.dataset.tag);
    },

    back: function () {
        wx.navigateBack()
    },

    processSearch:function (queryName) {
        const that = this;
        this.setData({
            showResult: true
        });
        wx.showNavigationBarLoading();
        api.searchBook(queryName.trim()).then(function (res) {
            wx.hideNavigationBarLoading()
            that.setData({
                books: res.data.books
            })
        }, function (res) {
            that.setData({
                books: []
            })
            wx.hideNavigationBarLoading();
        })
    }

})