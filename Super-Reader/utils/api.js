import Promise from 'promise.js';
const baseUrl = require('./config.js');

/**
 * 获取分类接口
 */
function gerCats() {
    var url = baseUrl.baseUrl + "/cats/lv2/statistics"
    return baseNet(url)
}
/**
 * 书籍详情
 * @param bookId
 * @returns {*}
 */
function bookDetail(bookId) {
    var url = baseUrl.baseUrl + "/book/" + bookId
    return baseNet(url)
}

/**
 * 获取书籍目录
 * @param bookId
 * @returns {*}
 */
function getContents(bookId) {
    const url = baseUrl.baseUrl + '/mix-atoc/' + bookId + '?view=book-toc-' + bookId + '-chapters'
    return baseNet(url)
}

/**
 * 获取书籍列表
 * @param gender
 * @param cate
 * @param start
 * @param limit
 * @returns {*}
 */
function getBookList(gender,cate,start) {
    const url = baseUrl.baseUrl + "/book/by-categories?gender="+gender+"&type=hot&major="+cate+"&start="+start+"&limit="+25
    return baseNet(url)
}
/**
 * 获取内容
 * @param contents
 * @returns {*}
 */
function getContact(contents) {
    const url = baseUrl.contactUrl+"/chapter/"+encodeURIComponent(contents)
    return baseNet(url)
}
/**
 * 搜索内容
 * @param queryName
 * @returns {*}
 */
function searchBook(queryName) {
    const url = baseUrl.baseUrl+"/book/fuzzy-search?query="+queryName;
    return baseNet(url);
}
/**
 * 获取热门标签
 * @returns {*}
 */
function getHotWorld() {
    const url = baseUrl.baseUrl+"/book/hot-word";
    return baseNet(url);
}

function baseNet(url) {
    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                resolve(res)
                console.log("success")
            },
            fail: function (res) {
                reject(res)
                console.log("failed")
            }
        })
    })
}

module.exports.getCats = gerCats;
module.exports.bookDetail = bookDetail;
module.exports.getContents = getContents;
module.exports.getBookList = getBookList;
module.exports.getContact = getContact;
module.exports.searchBook = searchBook;
module.exports.getHotWorld = getHotWorld;