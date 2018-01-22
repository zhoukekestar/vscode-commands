var abcdef;
var abcdef;
var abcdef;

const funs = [];

funs.push(text => {
  return text.replace(/abcdef/g, 'aaa');
})

exports.execute = function(args) {
  const vscode = require('vscode');
  let text = vscode.window.activeTextEditor.document.getText();

  for (let i = 0; i < funs.length; i++) {
    text = funs[i](text);
  }

  vscode.window.activeTextEditor.edit(editBuilder => {
    editBuilder.replace(new vscode.Range(0,0,99999,99999), text);
  });
}