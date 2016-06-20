// 用 Template.registerHelper 創建一個全局的 helper 方法，我們可以在任何模板中使用它:
UI.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});
