# Meteor

[Meteor](https://www.meteor.com/): Build Apps with JavaScript   
[Modulus](https://modulus.io/)  

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


`$ meteor deploy myapp.meteor.com`  

### [modulus](https://modulus.io/)

[Getting Started with Meteor](https://help.modulus.io/customer/portal/articles/1647770-using-meteor-with-modulus)  
http://meteortips.com/deployment-tutorial/modulus/  

`$ npm install -g modulus`  
`$ modulus login --github`  
`$ cd path/to/project`  
`$ modulus deploy`  


Return to the main dashboard.  
Click on the project we created earlier.  
Select the “Administration” option in the sidebar.  
Scroll to the “Environment Variables” section.  
`ROOT_URL http://my-meteor-project-9339.onmodulus.net`  

`$ modulus env set ROOT_URL http://my-meteor-project-9339.onmodulus.net`  

QA : [Modulus Deployment Error: /mnt/input/.meteor directory must exist](https://forums.meteor.com/t/modulus-deployment-error-mnt-input-meteor-directory-must-exist/22533)
> my.modulus.io/project/xxx/admin / RUNTIME / NODE.JS (非選METEOR)


### Spacebars

Inclusion（partial）、Expression 和 Block Helper。  
Inclusion ： `{{> templateName}} `  
Expression ：`{{title}}`  
Block Helper ：模板的邏輯  在模板中控制流程 `{{#each}}…{{/each}}`或 `{{#if}}…{{/if}}` 把值分配給每個變量。
>簡單起見，採用與模板同名的方式來命名包含其 `helper` 的文件，區別是 `.js` 擴展名  

Inclusion example:
>client/main.html `{{> postsList}}`    
client/template/posts_list.html  `<template name="postsList"></template>`    

Block Helper example:

>client/templates/posts_list.html
```
<template name="postsList">
  <div class="posts">
    {{#each posts}}
      ...
    {{/each}}
  </div>
</template>
```
client/templates/posts_list.js  
```
Template.postsList.helpers({
  posts: postsData
});
```
