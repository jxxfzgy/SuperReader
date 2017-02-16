var util = require('../../utils/util.js')
var api = require('../../utils/api.js')
var app = getApp();
/*https://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=%E7%8E%84%E5%B9%BB&start=0&limit=10*/
Page({
    data: {
        loading: true,
        books: [],
        scrollHeight:0,
        scrollTop:200,
        hasMore:true,
        gender:"",
        cate:"",
        isLoading:false
        // books: [
        //     {
        //         _id: "51d11e782de6405c45000068",
        //         author: "天蚕土豆",
        //         cover: "/agent/http://image.cmfu.com/books/2750457/2750457.jpg",
        //         shortIntro: "大千世界，位面交汇，万族林立，群雄荟萃，一位位来自下位面的天之至尊，在这无尽世界，演绎着令人向往的传奇，追求着那主宰之路。 无尽火域，炎帝执掌，万火焚苍穹。 武...",
        //         title: "大主宰",
        //         site: "zhuishuvip",
        //         majorCate: "玄幻",
        //         latelyFollower: 378859,
        //         latelyFollowerBase: 0,
        //         minRetentionRatio: 0,
        //         retentionRatio: 56.48,
        //         lastChapter: "第1476章 变天的浮屠古族",
        //         tags: [
        //             "玄幻",
        //             "热血",
        //             "架空",
        //             "异界大陆",
        //             "巅峰",
        //             "修炼",
        //             "主宰"
        //         ]
        //     },
        //     {
        //         _id: "5816b415b06d1d32157790b1",
        //         title: "圣墟",
        //         author: "辰东",
        //         shortIntro: "在破败中崛起，在寂灭中复苏。 沧海成尘，雷电枯竭，那一缕幽雾又一次临近大地，世间的枷锁被打开了，一个全新的世界就此揭开神秘的一角……",
        //         cover: "/agent/http://qidian.qpic.cn/qdbimg/349573/1004608738/180",
        //         site: "zhuishuvip",
        //         majorCate: "玄幻",
        //         latelyFollower: 223866,
        //         latelyFollowerBase: 0,
        //         minRetentionRatio: 0,
        //         retentionRatio: 70.93,
        //         lastChapter: "呼唤推荐票和月票",
        //         tags: [
        //             "玄幻",
        //             "东方玄幻"
        //         ]
        //     }
        // ]
    },
    onLoad: function (options) {
        this.setTitle(options.cateName)
        var that = this
        wx.getSystemInfo({
            success: function(res) {
                console.log(res.windowWidth)
                console.log(res.windowHeight)
                that.setData({
                    scrollHeight:res.windowHeight
                })
            }
        })
        this.setData({
            gender:options.gender,
            cate:options.cateName
        })
        this.loadData(this)

    },

    bookDetail:function (e) {
        wx.navigateTo({
            url: "../detail/detail?_id="+e.currentTarget.dataset.id+"&title="+e.currentTarget.dataset.title
        })
    },
    loadMore:function () {
        this.loadData(this)
    },

    scroll:function (e) {
        console.log("====scroll======")
        this.setData({
            scrollTop : e.detail.scrollTop
        });
    },

    setTitle: function (title) {
        wx.setNavigationBarTitle({
            title: title
        })
    },

    loadData:function(that){
        if (this.data.isLoading){
            return ;
        }
        console.log("====loadData======")
        this.setData({
            isLoading:true
        });
        const gender = that.data.gender
        const cate = that.data.cate
        api.getBookList(gender, cate, this.data.books.length).then(function (res) {
            const books = that.data.books.concat(res.data.books);
            console.log(books)
            that.setData({
                loading:false,
                books:books,
                isLoading:false
            })
        },function (res) {
            that.setData({
                loading:false,
                isLoading:false
            })
        })
    }

});