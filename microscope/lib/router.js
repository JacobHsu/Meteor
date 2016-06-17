Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading', // loading 加載模板
  notFoundTemplate: 'notFound',
  waitOn: function() { return [Meteor.subscribe('notifications')] } // posts 訂閱從 main.js 移到路由文件中 視覺上的反饋讓用戶知道正在讀取數據
  // Meteor.subscribe('posts'),  Meteor.subscribe('comments'),
  // 全局定義了 waitOn 方法，所以這個只會在用戶第一次訪問你的 App 的時候發生一次。在那之後，數據已經被加載到了瀏覽器的內存，路由器不需要再次去等待它
});



Router.route('/posts/:_id', {
  name: 'postPage', //  映射到 postPage 模板 post_page.html
  waitOn: function() {
    return Meteor.subscribe('comments', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); } // 指定一個數據源  URL 上獲取 _id
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() { return Posts.findOne(this.params._id); }
});

PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.postsLimit()};
  },
  waitOn: function() {
    return Meteor.subscribe('posts', this.findOptions());
  },
  data: function() {
    return {posts: Posts.find({}, this.findOptions())};
  }
});

// Router.route('/', {name: 'postsList'}); //映射到 postsList 模板  post_list.html
// 參數後面的 ? 表示參數是可選的
Router.route('/:postsLimit?', {
  name: 'postsList',
  waitOn: function() {
    var limit = parseInt(this.params.postsLimit) || 5;
    return Meteor.subscribe('posts', {sort: {submitted: -1}, limit: limit});
  },
  data: function() {
    var limit = parseInt(this.params.postsLimit) || 5;
    return {
      posts: Posts.find({}, {sort: {submitted: -1}, limit: limit})
    };
  }
});
Router.route('/submit', {name: 'postSubmit'}); //新帖子的提交

// 沒有登錄，呈現出來的是 accessDenied 模板
var requireLogin = function() {
  if (! Meteor.user()) {
    this.render('accessDenied');
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'}); // dataNotFound hook
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
