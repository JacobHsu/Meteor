// Local collection 錯誤 Errors 集合將會只存在於瀏覽器中，並且將不作任何嘗試去同步回服務器。
Errors = new Mongo.Collection(null);

throwError = function(message) {
  Errors.insert({message: message});
};
