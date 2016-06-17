Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading', // loading 加載模板
  notFoundTemplate: 'notFound',
  waitOn: function() { return [Meteor.subscribe('notifications')] } // posts 訂閱從 main.js 移到路由文件中 視覺上的反饋讓用戶知道正在讀取數據
  // Meteor.subscribe('posts'),  Meteor.subscribe('comments'),
  // 全局定義了 waitOn 方法，所以這個只會在用戶第一次訪問你的 App 的時候發生一次。在那之後，數據已經被加載到了瀏覽器的內存，路由器不需要再次去等待它
});

// Iron Router 的一個新功能， Route Controllers。 Route controller 是通過簡單的方式將一組路由特性打包，其他的 route 可以繼承他們
PostsListController = RouteController.extend({
  template: 'postsList',
  increment: 5,
  postsLimit: function() {
    return parseInt(this.params.postsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: {submitted: -1}, limit: this.postsLimit()};
  },
  subscriptions: function() {
    this.postsSub = Meteor.subscribe('posts', this.findOptions());
  },
  posts: function() {
    return Posts.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.posts().count() === this.postsLimit();
    var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
    return {
      posts: this.posts(),
      ready: this.postsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }
});


Router.route('/posts/:_id', {
  name: 'postPage', //  映射到 postPage 模板 post_page.html
  waitOn: function() {
    return [
      Meteor.subscribe('singlePost', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  data: function() { return Posts.findOne(this.params._id); } // 指定一個數據源  URL 上獲取 _id
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  waitOn: function() {
    return Meteor.subscribe('singlePost', this.params._id);
  },
  data: function() { return Posts.findOne(this.params._id); }
});


// Router.route('/', {name: 'postsList'}); //映射到 postsList 模板  post_list.html
// 參數後面的 ? 表示參數是可選的
Router.route('/:postsLimit?', {
  name: 'postsList'
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
