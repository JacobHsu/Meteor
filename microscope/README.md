# packages

`meteor add iron:router`  
`meteor add sacha:spin`  
`meteor add session`  
`meteor add ian:accounts-ui-bootstrap-3`  
`meteor add accounts-password`
`meteor remove insecure`  //恢復數據安全
`meteor add audit-argument-checks` //安全檢查


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

Mongo Shell  
```
meteor:PRIMARY> db.users.count()
2
meteor:PRIMARY> db.users.find()
{ "_id" : "siHzwXwA5ceRCs2Bn", ... }
{ "_id" : "xcMXm36RhEs5tHMBC", ... }
```


### Iron Rounter
負責處理在 HTML <body> 標籤裡面該呈現什麼  

`loadingTemplate: 'loading'` 自帶了一個延緩顯示模板的方法
`notFoundTemplate: 'notFound' ` 解決當某用戶輸入錯誤的 URL 時的情況  

# Debug

> Error: A method named '/posts/insert' is already defined

 用了重複 new Mongo.Collection('posts')
