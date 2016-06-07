Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault(); // 確保瀏覽器不會再繼續嘗試提交表單

    var post = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    };

    //post._id = Posts.insert(post);
    //Router.go('postPage', post);

    Meteor.call('postInsert', post, function(error, result) {
      // 向用戶顯示錯誤信息並終止
      if (error)
        return alert(error.reason);

      // 顯示結果，跳轉頁面
      if (result.postExists)
        alert('This link has already been posted（該鏈接已經存在）');

      Router.go('postPage', {_id: result._id});
    });
  }
});
