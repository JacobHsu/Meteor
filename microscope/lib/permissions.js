// 因為移除了 insecure 包，現在所有客戶端的修改都會被拒絕。
// check that the userId specified owns the documents
ownsDocument = function(userId, doc) {
  return doc && doc.userId === userId;
}
