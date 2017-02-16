const app = getApp();
const length = 100;
Page({
    data: {
        loading:true,
        contentsCount: 0,
        contentsRange: [],
        contentsValue:[],
        currentRange:"",
        currentContents:[],
        rangeIndex: 0,
        bookId:"",
        from:""
    },
    onLoad: function (options) {
        // 页面初始化 options为页面跳转所带来的参数
        this.setData({
            from:options.from
        })
        if (app.globalData.bookContents) {
            this.processData(app.globalData.bookContents,length)
        } else {
            this.processContents(options.bookId);
        }
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

    processData:function (resData,length) {
        const allContents = resData.mixToc.chapters;
        console.log(allContents.length)
        const range = Math.floor(allContents.length/length);
        const contentsValue = [];
        const contentsRange = [];
        for(var i = 0; i< range;i++){
            contentsValue.push(allContents.slice((i*length),i*length+length));
        }
        for(var i = 0; i< contentsValue.length;i++){
            contentsRange.push((i*length+1)+"-"+(i*length+length)+"章");
        }

        var currentLength = contentsValue.length*length;
        if(currentLength < allContents.length){
            contentsValue.push(allContents.slice(currentLength,allContents.length))
            contentsRange.push(((contentsValue.length-1)*length+1)+"-"+allContents.length+"章");
        }
        this.setData({
            loading:false,
            contentsCount:allContents.length,
            contentsRange:contentsRange,
            contentsValue:contentsValue,
            currentRange:contentsRange[0],
            currentContents:contentsValue[0],
            bookId:resData.mixToc_id
        })
    },
    processContents: function (bookId) {
        var that = this;
        api.getContents(bookId).then(function (res) {
            app.globalData.bookContents = res.data;
            that.processData(app.globalData.bookContents,length)
        }, function (res) {
            that.setData({
                loading: false
            })
        });
    },
    bindChapterChange: function(e) {
        const contentsRange = this.data.contentsRange;
        const contentsValue = this.data.contentsValue;
        const rangeIndex =  e.detail.value;
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            currentRange:contentsRange[rangeIndex],
            currentContents : contentsValue[rangeIndex],
            rangeIndex:rangeIndex
        })
    },
    readBook(e){
        const realIndex = e.currentTarget.dataset.index+this.data.rangeIndex*length;
        const bookId = this.data.bookId;
        if(this.data.from == "reader"){
            app.globalData.contentsIndex = realIndex;
            wx.navigateBack();
        }else {
            wx.redirectTo({
                url:"../reader/reader?contentsIndex="+realIndex+"&bookId="+bookId
            })
        }

    },
})