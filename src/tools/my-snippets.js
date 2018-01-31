const vscode = require('vscode');
const utils = require('../utils');
let editor = null;

const importNewLib = (importstr) => {

  let text = editor.document.getText();
  text = text.replace(/from.*;\n\n/, function(str) {
    return `${str.substring(0, str.length - 1)}${importstr}\n\n`;
  });

  editor.edit(editBuilder => {
    editBuilder.replace(new vscode.Range(0,0,99999,99999), text);
    vscode.commands.executeCommand('workbench.action.files.save');
  });
}

const saveToPackage = (name) => {
  // save deps to package.json
  const path = utils.getProjectPath();
  if (path) {
    const terminal = vscode.window.createTerminal('tools:snippets');
    terminal.sendText(`cd ${path}`)
    terminal.sendText(`tnpm install ${name} --save`);
    terminal.sendText('echo "It will auto close after 20s."')
    terminal.show();
    try {
      setTimeout(() => {
        terminal.dispose();
      }, 20000)
    } catch (e) {
      console.log(e)
    }

  }
}

const insertSnippet = (snippet) => {
  return new Promise(resolve => {

    editor.edit(editBuilder => {
      editBuilder.insert(editor.selection.active, snippet);
    });

    setTimeout(() => {
      resolve();
    }, 500)
  })

}

const snippets = {
  'goldlog launch': () => {
    insertSnippet(`goldlog.launch(['a', 'b'], { name: 'yourPageName' });`) .then(() => {
      importNewLib(`import goldlog from '@ali/universal-goldlog';`);
      saveToPackage('@ali/universal-goldlog');
    });
  },
  'set title navigator': () => {
    insertSnippet(`
      // 设置标题
      Navigator.setNavBar({
        title: 'title',
      }, (err) => console.log(err));
    `.replace(/[ ]{6}/g, '')).then(() => {
      importNewLib(`import Navigator from '@ali/cox-navigator';`);
      saveToPackage('@ali/cox-navigator');
    });
  },
  'load loading': () => {
    insertSnippet(`<GlobalLoading />`).then(() => {
      importNewLib(`import { GlobalLoading } from '@ali/rax-cox-loading';`);
      saveToPackage('@ali/rax-cox-loading');
    });
  },
  'emit emitter event': () => {
    insertSnippet(`Emitter.on.emit`).then(() => {
      importNewLib(`import Emitter from '@ali/universal-emitter';`);
      saveToPackage('@ali/universal-emitter');
    });
  },
  'toast show alert': () => {
    insertSnippet(`Toast.show('hi')`).then(() => {
      importNewLib(`import Toast from '@ali/universal-toast';`);
      saveToPackage('@ali/universal-toast')
    })
  },
  'hello world': `console.log('hello world!');`,
};


module.exports = function () {
  vscode.window.showQuickPick(Object.keys(snippets)).then(val => {
    editor = vscode.window.activeTextEditor;

    if (typeof snippets[val] === 'function') {
      snippets[val]();
    } else {
      insertSnippet(snippets[val]);
    }
  })
}