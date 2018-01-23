const vscode = require('vscode');


exports.execute = function(args) {

  let text = vscode.window.activeTextEditor.document.getText();
  const fileName = vscode.window.activeTextEditor.document.fileName;


  // args.require('/Users/zhoukeke/workspace/GitHub/vscode-commands/src/replace-davinci.js')
  // args.require('~/workspace/Github/vscode-commands/src/replace-davinci');
  // vscode.window.showInformationMessage('Davinci replace finished!');
  // console.log('global', Object.keys(global));
  // console.log('replace', Object.keys(replaceDavinci))
  // console.log(JSON.stringify(replaceDavinci))
  // console.log('execute', text, fileName)
  const replaceDavinci = require('./replace-davinci');
  text = replaceDavinci(text);

  vscode.window.activeTextEditor.edit(editBuilder => {
    editBuilder.replace(new vscode.Range(0,0,99999,99999), text);
  });
}