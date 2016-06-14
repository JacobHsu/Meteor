# Tutorials

## [Creating your first app simple-todos](https://www.meteor.com/tutorials/blaze/creating-an-app)  

# packages
`$ meteor add reactive-dict`  
`$ meteor add accounts-ui accounts-password`  
`$ meteor add accounts-facebook`  

`$ meteor remove insecure`  
`$ meteor remove autopublish`

# Mongo Shell

console1 : `$ meteor`  
console2 : `$ meteor mongo `  
>MongoDB shell version: 2.6.7  
connecting to: 127.0.0.1:3001/meteor

```
meteor:PRIMARY> db.tasks.insert({ text: "Hello world!", createdAt: new Date() });  
WriteResult({ "nInserted" : 1 })  
meteor:PRIMARY> db.tasks.find();  
{ "_id" : ObjectId("574d2b3dbfc460e8ec730ccc"), "text" : "Hello world!", "createdAt" : ISODate("2016-06-04T06:04:04.057Z") }  
```

# Running your app on Android or iOS

Meteor's mobile app features don't work on Windows.  

Running on an Android emulator    
`$ meteor install-sdk android`  
`$ meteor add-platform android`  
`$ meteor run android`  
`$ meteor run android-device`  

# Optimistic UI

When you call a method on the client using `Meteor.call`, two things happen in parallel:  
1. The client sends a request to the server to run the method in a secure environment, just like an AJAX request would work  
2. A simulation of the method runs directly on the client to attempt to predict the outcome of the server call using the available information  
