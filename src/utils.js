const fs = require('fs');
const path = require('path');
const vscode = require('vscode');

const searchDirByFileName = base => {
  const fileName = vscode.window.activeTextEditor.document.fileName;
  let dir = path.dirname(fileName);

  while(true) {
    let file = path.format({ dir, base });
    if (dir === '/') break;
    try {
      fs.statSync(file);
      break;
    } catch (e) {
      dir = path.join(dir, '..');
    }
  }
  if (dir === '/') return null;
  return dir;
}

module.exports = {
  getProjectPath() {
    return searchDirByFileName('./.git/HEAD');
  },
  getPackagePath() {
    return searchDirByFileName('./package.json');
  }
}