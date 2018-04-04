const vscode = require('vscode');
const utils = require('../utils');

const OPTIONS = {
  // EMPTY: ' --- 请选择 --- ',
  SNIPPETS: '代码提示库 snippets',
  TERMINAL: '终端执行 terminal',
}

exports.execute = function(args) {

  // Get current text & fliename
  let text = vscode.window.activeTextEditor.document.getText();
  const fileName = vscode.window.activeTextEditor.document.fileName;

  // Pick one action to process
  vscode.window.showQuickPick(Object.keys(OPTIONS).map(key => OPTIONS[key])).then(val => {
    switch(val) {
      case OPTIONS.TERMINAL:
        const path = utils.getProjectPath();
        const terminal = vscode.window.createTerminal(path.match(/\/([^\/]*)$/)[1]);
        terminal.sendText(`cd ${path}`);
        terminal.sendText('ls');
        terminal.show();
        break;
      case OPTIONS.SNIPPETS:
        const snippets = require('./my-snippets');
        return snippets();
      default:
        args.log('Nothing Selected.');
    }
  })
}