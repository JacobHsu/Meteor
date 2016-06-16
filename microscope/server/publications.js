Meteor.publish('posts', function() {
  return Posts.find();
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
