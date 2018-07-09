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

  // let selection = editor.selection;
  // let text = editor.document.getText(selection);

  console.log('install text')
  const terminal = vscode.window.createTerminal({
    cwd: path,
    name: 'installdeps',
  });
  terminal.show();

  let text = editor.document.getText();
  let mods = [];
  text.replace(/import(?:["'\s]*(?:[\w*{}\n, ]+)from\s*)["'\s]([@\w/_-]+)["'\s]/g, (s, mod) => {
    mods.push(mod);
  });

  terminal.sendText(`tnpm i ${mods.join(' ')} -S`);
  // terminal.sendText(`cd ${path}`);
  // terminal.sendText(`tnpm i ${text} -S`);

}