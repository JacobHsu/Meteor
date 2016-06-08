// 建立一個更加靈活的錯誤報告機制，來更好地在不打斷流程的情況下告訴用戶到底發生了什麼。 似Growl
Template.errors.helpers({
  errors: function() {
    return Errors.find();
  }
});

// 在3秒後清除錯誤消息
Template.error.onRendered(function() {
  var error = this.data;
  Meteor.setTimeout(function () {
    Errors.remove(error._id);
  }, 3000);
});
