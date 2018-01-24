const vscode = require('vscode');
const OPTIONS = {
  DAVINCI: 'DAVINCI',
  EMPTY: 'EMPTY',
}

exports.execute = function(args) {

  let text = vscode.window.activeTextEditor.document.getText();
  const fileName = vscode.window.activeTextEditor.document.fileName;
  // const output = vscode.window.createOutputChannel('vscode-commands');

  vscode.window.showQuickPick([OPTIONS.DAVINCI, OPTIONS.EMPTY]).then(val => {
    switch(val) {
      case OPTIONS.DAVINCI:
        const replaceDavinci = require('./davinci');
        text = replaceDavinci(text);
        args.log(OPTIONS.DAVINCI + ' Done!');
        break;
      default:
        args.log('Nothing Selected.');
    }
  })


  // args.require('/Users/zhoukeke/workspace/GitHub/vscode-commands/src/replace-davinci.js')
  // args.require('~/workspace/Github/vscode-commands/src/replace-davinci');
  // vscode.window.showInformationMessage('Davinci replace finished!');
  // console.log('global', Object.keys(global));
  // console.log('replace', Object.keys(replaceDavinci))
  // console.log(JSON.stringify(replaceDavinci))
  // console.log('execute', text, fileName)


  vscode.window.activeTextEditor.edit(editBuilder => {
    editBuilder.replace(new vscode.Range(0,0,99999,99999), text);
    vscode.commands.executeCommand('workbench.action.files.save');
  });
}