const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

module.exports.getProjectPath = () => {
  const fileName = vscode.window.activeTextEditor.document.fileName;
  let dir = path.dirname(fileName);
  let base = './.git/HEAD';

  while(true) {
    let file = path.format({ dir, base });
    if (dir === '/') break;
    try {
      fs.statSync(file);
      break;
    } catch (e) {
      console.log(`${file} is not exist.`);
      dir = path.join(dir, '..');
    }
  }
  console.log(`${dir} is your project dir.`);
  if (dir === '/') return null;
  return dir;
}