// Posts 會共同存在運行在服務器和客戶端。
// var 限制對象的作用域在文件範圍內。我們想要 Posts 作用於整個應用範圍內，不用。
Posts = new Mongo.Collection('posts');

// Posts.allow({
//   insert: function(userId, doc) {
//     // 只允許登錄用戶添加帖子
//     return !! userId;
//   }
// });
Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); }
});

//當添加多個 deny 回調時，如果任何一個回調返回 true，運行就會失敗。
//在此例中，這意味著 update 只有在 [1]面向 title 和 url 兩個字段時才會成功，並且[2]這些字段不能為空。

// 確保用戶只能編輯特定的字段
Posts.deny({
  update: function(userId, post, fieldNames) {
    // 只允許更改帖子的某些屬性。只能更改如下兩個字段：
    // 使用 Underscore 的 without() 方法返回一個不包含 url 和 title 字段的子數組。
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
});

// 服務器端驗證帖子
Posts.deny({
  update: function(userId, post, fieldNames, modifier) {
    var errors = validatePost(modifier.$set);
    return errors.title || errors.url;
  }
});

validatePost = function (post) {
  var errors = {};

  if (!post.title)
    errors.title = "Please fill in a headline";

  if (!post.url)
    errors.url =  "Please fill in a URL";

  return errors;
}

Meteor.methods({
  postInsert: function(postAttributes) {
    // 檢查調用方法的用戶是否登陸（通過確認 Meteor.userId() 是否是個 String 字符串）
    check(Meteor.userId(), String);
    // 檢查是否包含 title 和 url 字​​​​符串，來保證我們不會添加任意數據到數據庫中
    check(postAttributes, {
      title: String,
      url: String
    });

    // 服務器端驗證
    var errors = validatePost(postAttributes);
    if (errors.title || errors.url)
      throw new Meteor.Error('invalid-post', "You must set a title and URL for your post");

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
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0
    });
    var postId = Posts.insert(post);
    return {
      _id: postId
    };
  },

  upvote: function(postId) {
    check(this.userId, String);
    check(postId, String);

    var affected = Posts.update({
      _id: postId,
      upvoters: {$ne: this.userId}
    }, {
      $addToSet: {upvoters: this.userId},
      $inc: {votes: 1}
    });

    if (!affected)
      throw new Meteor.Error('invalid', "You weren't able to upvote that post");
  }

});
