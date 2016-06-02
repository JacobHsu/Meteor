// Posts 會共同存在運行在服務器和客戶端。
// var 限制對象的作用域在文件範圍內。我們想要 Posts 作用於整個應用範圍內，不用。
Posts = new Mongo.Collection('posts');
