//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        this.globalData.localBooks = this.getBook();
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    getBook: function () {
        try {
            var value = wx.getStorageSync('localBooks')
            if (!value) {
                value = [];
            }
            return value;
        } catch (e) {
            return [];
        }
    },
    globalData: {
        localBooks: [],
        userInfo: null,
        currentBook: null,
        bookContents: null,
        contentsIndex:-1
    }
})