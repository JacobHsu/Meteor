// Posts 會共同存在運行在服務器和客戶端。
// var 限制對象的作用域在文件範圍內。我們想要 Posts 作用於整個應用範圍內，不用。
Posts = new Mongo.Collection('posts');

// Posts.allow({
//   insert: function(userId, doc) {
//     // 只允許登錄用戶添加帖子
//     return !! userId;
//   }
// });

Meteor.methods({
  postInsert: function(postAttributes) {
    // 檢查調用方法的用戶是否登陸（通過確認 Meteor.userId() 是否是個 String 字符串）
    check(Meteor.userId(), String);
    // 檢查是否包含 title 和 url 字​​​​符串，來保證我們不會添加任意數據到數據庫中
    check(postAttributes, {
      title: String,
      url: String
    });

    // 防止重複 引導用戶到已存在的帖子上。
    var postWithSameLink = Posts.findOne({url: postAttributes.url});
    if (postWithSameLink) {
      // 調用了一個 return，方法就會到此停止，而不會執行 insert 聲明
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();
    //  _.extend() 方法來自於 Underscore 庫，作用是將一個對象的屬性傳遞給另一個對象。
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  }
});
