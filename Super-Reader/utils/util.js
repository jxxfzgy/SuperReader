const constant = require('./constant.js');
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

function setTitle(title) {
    wx.setNavigationBarTitle({
        title: title
    })
}

function saveBook(book) {
    var localBooks = getBook()
    if (hasSaveVsBooks(localBooks,book)) {
        return;
    }
    console.log("saveBook====1====" + book)
    var saveBook = new Object();
    saveBook._id = book._id;
    saveBook.cover = book.cover;
    saveBook.title = book.title;
    saveBook.time = Date.parse(new Date());
    localBooks.push(saveBook)
    wx.setStorage({
        key: constant.READ_BOOK_KEY,
        data: localBooks
    })
}

function removeBook(id) {
    var localBooks = getBook();
    for(var i = 0 ; i < localBooks.length ; i ++){
        if(id == localBooks[i]._id){
            localBooks.splice(i,1);
            // wx.setStorageSync(constant.READ_BOOK_KEY,localBooks);
            wx.setStorage({
                key: constant.READ_BOOK_KEY,
                data: localBooks
            })
            return;
        }
    }
}


function hasSave(bookId) {
    var value = wx.getStorageSync(constant.READ_BOOK_KEY)
    for (var i = 0; i < value.length; i++) {
        if (bookId == value[i]._id) {
            return true;
        }
    }
    return false;
}
function hasSaveVsBooks(books,book) {
    for (var i = 0; i < books.length; i++) {
        if (book._id == books[i]._id) {
            return true;
        }
    }
    return false;
}
function getBook() {
    try {

        var value = wx.getStorageSync(constant.READ_BOOK_KEY)
        if (!value) {
            value = [];
        }
        return value;
    } catch (e) {
        return [];
    }
}

function updateLocalBook(id) {
    if(hasSave(id)){
        var localBooks = getBook();
        for(var i = 0 ; i < localBooks.length ; i ++){
            const book = localBooks[i];
            if(id == book._id){
                localBooks.splice(i,1);
                book.time = Date.parse(new Date());
                localBooks.push(book);
                wx.setStorage({
                    key: constant.READ_BOOK_KEY,
                    data: localBooks
                })
                return;
            }
        }
    }
}

function saveData(key,obj) {
    wx.setStorage({
        key: key,
        data: obj
    })
}

function readBook(e) {
    const id = e.currentTarget.dataset.id;
    const title = e.currentTarget.dataset.title;
    try {
        var readInfo = wx.getStorageSync(id+constant.READER_INFO_KEY)
        if (!readInfo) {
            readInfo = new Object();
            readInfo.contentsIndex = 0;
            readInfo.scrollTop = 0;
        }
        console.log(readInfo);
        const top = readInfo.scrollTop;
        wx.navigateTo({
            url: "../reader/reader?contentsIndex="+readInfo.contentsIndex+"&top="+top+"&bookId="+id+"&title="+title
        })
    } catch (e) {
        // Do something when catch error,异常处理
    }
}

// function reSortBooks(bookId) {
//     if(hasSave(bookId)){
//         var localBooks = getBook();
//         for(var i = 0 ; i < localBooks.length ; i ++){
//             if(id == localBooks[i]._id){
//                 const currentBook = localBooks[i];
//                 localBooks.splice(i,1);
//                 localBooks.push
//                 wx.setStorage({
//                     key: constant.READ_BOOK_KEY,
//                     data: localBooks
//                 })
//                 return;
//             }
//         }
//     }
// }
function showNavigationBarLoading() {
    wx.showNavigationBarLoading()
}

function hideNavigationBarLoading() {
    wx.hideNavigationBarLoading()
}

module.exports = {
    formatTime: formatTime,
    setTitle: setTitle,
    saveBook: saveBook,
    getBook: getBook,
    hasSave: hasSave,
    showNavigationBarLoading: showNavigationBarLoading,
    hideNavigationBarLoading: hideNavigationBarLoading,
    saveData: saveData,
    readBook: readBook,
    removeBook: removeBook,
    updateLocalBook: updateLocalBook,
}
