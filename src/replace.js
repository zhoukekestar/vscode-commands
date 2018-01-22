const vscode = require('vscode');
const replaceDavinci = require('./replace-davinci');

exports.execute = function(args) {



  vscode.window.showInformationMessage('Davinci replace finished!');

// console.log('global', Object.keys(global));
// console.log('replace', Object.keys(replaceDavinci))
// console.log(JSON.stringify(replaceDavinci))

  let text = vscode.window.activeTextEditor.document.getText();
  const fileName = vscode.window.activeTextEditor.document.fileName;

  console.log('execute')
  // replace editor text
  // text = replaceDavinci.replace(text, fileName);

  vscode.window.activeTextEditor.edit(editBuilder => {
    editBuilder.replace(new vscode.Range(0,0,99999,99999), text);
  });
}