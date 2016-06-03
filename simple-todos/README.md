# Tutorials

## [Creating your first app simple-todos](https://www.meteor.com/tutorials/blaze/creating-an-app)  

# packages
`$ meteor add reactive-dict`

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
