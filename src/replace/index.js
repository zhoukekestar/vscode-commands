const vscode = require('vscode');
const OPTIONS = {
  EMPTY: ' --- 请选择 --- ',
  DAVINCI: '达芬奇代码 2 Cox',
  DAVINCI_CSS: '分离达芬奇 Styles 到 Css',
}

exports.execute = function(args) {

  // Get current text & fliename
  let text = vscode.window.activeTextEditor.document.getText();
  const fileName = vscode.window.activeTextEditor.document.fileName;

  // Pick one action to process
  vscode.window.showQuickPick(Object.keys(OPTIONS).map(key => OPTIONS[key])).then(val => {
    switch(val) {
      case OPTIONS.DAVINCI:
        const replaceDavinci = require('./davinci');
        text = replaceDavinci(text, fileName);
        args.log(OPTIONS.DAVINCI + ' Done!');
        break;
      case OPTIONS.DAVINCI_CSS:
        const replaceDavinciCss = require('./davinci-css');
        text = replaceDavinciCss(text, fileName);
        args.log(OPTIONS.DAVINCI_CSS + ' Done!');
        break;
      default:
        args.log('Nothing to do.');
    }

    // Get new content & auto save this.
    vscode.window.activeTextEditor.edit(editBuilder => {
      editBuilder.replace(new vscode.Range(0,0,99999,99999), text);
      vscode.commands.executeCommand('workbench.action.files.save');
    });
  });
}