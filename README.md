# Meteor

[Meteor](https://www.meteor.com/): Build Apps with JavaScript   

# Tutorials

## [Creating your first app simple-todos](https://www.meteor.com/tutorials/blaze/creating-an-app)  

`$ meteor create simple-todos`  

>To run your new app:  
  cd simple-todos  
  meteor  

>If you are new to Meteor, try some of the learning resources here:  
  https://www.meteor.com/learn  


`$ cd simple-todos`  
`$ meteor`  

> => App running at: http://localhost:3000/
   Type Control-C twice to stop.


## [Discover Meteor](http://zh.discovermeteor.com/)

Meteor 是一個構建在 Node.js 之上的平台，用來開發實時網頁程序。  

https://github.com/DiscoverMeteor/Microscope   
`$ meteor create microscope`  
`$ cd microscope`  
`$ meteor`  

`meteor add twbs:bootstrap`  
`meteor add underscore`  

>在 `/server` 文件夾中的代碼只會在服務器端運行。  
在 `/client` 文件夾中的代碼只會在客戶端運行。  
其它代碼則將同時運行於服務器端和客戶端上，如 `/lib`。  
靜態文件（字體，圖片等）放置在 `/public` 文件夾中。


順序加載文件：

>在 `/lib` 文件夾中的文件將被優先載入。  
所有以 `main.*` 命名的文件將在其他文件載入後載入。  
其他文件以文件名的字母順序載入。  
