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
  editor.edit(editBuilder => {
    editBuilder.insert(editor.selection.active, snippet);
  })
}

const snippets = {
  'goldlog launch': () => {
    // add snippet
    insertSnippet(`goldlog.launch(['a', 'b'], { name: 'yourPageName' });`);

    setTimeout(() => {
      // add deps
      importNewLib(`import goldlog from '@ali/universal-goldlog';`);
      //save
      saveToPackage('@ali/universal-goldlog');
    }, 500);
  },
  'set title navigator': () => {
    // add snippet
    insertSnippet(`
// 设置标题
Navigator.setNavBar({
  title: 'title',
}, (err) => console.log(err));
    `);

    setTimeout(() => {
      // add deps
      importNewLib(`import Navigator from '@ali/cox-navigator';`);
      //save
      saveToPackage('@ali/cox-navigator');
    }, 500);

  },
  'load loading': () => {
    insertSnippet(`<GlobalLoading />`);
    setTimeout(() => {
      // add deps
      importNewLib(`import { GlobalLoading } from '@ali/rax-cox-loading';`);
      // save
      saveToPackage('@ali/rax-cox-loading')
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