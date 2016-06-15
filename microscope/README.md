[Microscope github](https://github.com/DiscoverMeteor/Microscope)
[DiscoverMeteor_zh](https://github.com/DiscoverMeteor/DiscoverMeteor_zh)  

# packages

`meteor add iron:router`  
`meteor add sacha:spin`  
`meteor add session`  
`meteor add ian:accounts-ui-bootstrap-3`  
`meteor add accounts-password`
`meteor remove insecure`  //恢復數據安全
`meteor add audit-argument-checks` //安全檢查  
`meteor add check`  

### [accounts-password](https://atmospherejs.com/meteor/accounts-password)  

A login service that enables secure password-based login.  

Browser Console
```
>Meteor.users.findOne();
>Meteor.user()
Object {_id: "siHzwXwA5ceRCs2Bn", profile: Object, username: "jacobhsu"}
>Meteor.users.find().count();
1
```

```
>Posts.findOne();  
>Posts.find().fetch()   
>Comments.findOne();  
```

Mongo Shell  
```
meteor:PRIMARY> db.users.count()
2
meteor:PRIMARY> db.users.find()
{ "_id" : "siHzwXwA5ceRCs2Bn", ... }
{ "_id" : "xcMXm36RhEs5tHMBC", ... }
```

# Callback function

一個成功的 `insert` 操作要求
至少一個返回 `true` 的允許 `allow` 回調函數，
並且所有拒絕 `deny` 回調函數都返回 `false`。

更直觀地說，`Meteor` 從拒絕回調函數開始，然後是 `allow` 函數，逐一執行，直到有一個返回 `true`。

### Iron Rounter
負責處理在 HTML <body> 標籤裡面該呈現什麼  

`loadingTemplate: 'loading'` 自帶了一個延緩顯示模板的方法
`notFoundTemplate: 'notFound' ` 解決當某用戶輸入錯誤的 URL 時的情況  

# Debug

> Error: A method named '/posts/insert' is already defined  

 用了重複 new Mongo.Collection('posts')

 >  Exception while invoking method 'postInsert' ReferenceError: [check is not defined](https://github.com/meteor/meteor/issues/5258)  

 `meteor add check`  
