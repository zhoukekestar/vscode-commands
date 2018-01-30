const vscode = require('vscode');
const OPTIONS = {
  // EMPTY: ' --- 请选择 --- ',
  SNIPPETS: '代码提示库',
  TERMINAL: '终端执行',
}

exports.execute = function(args) {

  // Get current text & fliename
  let text = vscode.window.activeTextEditor.document.getText();
  const fileName = vscode.window.activeTextEditor.document.fileName;

  // Pick one action to process
  vscode.window.showQuickPick(Object.keys(OPTIONS).map(key => OPTIONS[key])).then(val => {
    switch(val) {
      case OPTIONS.TERMINAL:
        const terminal = vscode.window.createTerminal('pipeTest');
        terminal.sendText('ls');
        terminal.sendText('cd ..');
        terminal.sendText('ls');
        terminal.show();
        args.log('terminal')
        break;
      case OPTIONS.SNIPPETS:
        const snippets = require('./my-snippets');
        return snippets();
      default:
        args.log('Nothing Selected.');
    }
  })
}