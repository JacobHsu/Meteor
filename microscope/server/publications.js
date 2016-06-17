Meteor.publish('posts', function(options) {
  // return Posts.find();

  // 通過 check() 方法我們知道用戶不能偷偷加入額外的 options
  // 更安全的做法是傳遞單個參數而不是整個對象，通過這樣確保數據安全
  check(options, {
    sort: Object,
    limit: Number
  });
  return Posts.find({}, options);
});

Meteor.publish('singlePost', function(id) {
  check(id, String)
  return Posts.find(id);
});

Meteor.publish('comments', function(postId) {
  //return Comments.find();
  check(postId, String);
  return Comments.find({postId: postId});
});

Meteor.publish('notifications', function() {
  //return Notifications.find();
   return Notifications.find({userId: this.userId, read: false});
});
