const utils = require('../utils');
const vscode = require('vscode');


module.exports = function() {
  const path = utils.getPackagePath();
  if (!path) return;

  console.log('install deps', path);

  let editor = vscode.window.activeTextEditor;
  if (!editor) {
      return;
  }

  let selection = editor.selection;
  let text = editor.document.getText(selection);

  console.log('install text')
  const terminal = vscode.window.createTerminal(path.match(/\/([^\/]*)$/)[1]);
  terminal.sendText(`cd ${path}`);
  terminal.sendText(`tnpm i ${text} -S`);
  terminal.show();

  setTimeout(() => {
    terminal.dispose();
  }, 3000);
}