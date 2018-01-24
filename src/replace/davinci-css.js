const fs = require('fs');

const convertLowerCase = name => {
  name = name.split('');
  for (let i = 0; i < name.length; i++) {
    let code = name[i].charCodeAt(0);
    // console.log(code)
    if(code > 64 && code < 91) {

      code = String.fromCharCode(code + 32);
      // console.log(name[i].charCodeAt(0) + '->' + code);
      name.splice(i, 1, '-' + code)
    }
  }
  return name.join('');
}

const convertJS2CSS = o => {
  let res = {};
  Object.keys(o).map(key => {
    let css = {};
    let cla = o[key];
    Object.keys(cla).map(key => {
      css[convertLowerCase(key)] = cla[key] + ';'
    })
    res[`.${key}`] = css;
  })

  return res;
}

const convert = (input) => {
  input = eval(`(${input})`);
  const output = convertJS2CSS(input)
  return JSON.stringify(output, null, 2)
      .replace(/",/g, '')
      .replace(/"/g, '')
      .replace(/: {/g, ' {')
      .replace(/},/g, '}')
      .replace(/rem/g, '')

}

const reg = /let styles = ({[\s\S]*?});/;
module.exports = function(text, filename) {
  const cssFileName = filename.replace('.js', '.css');
  text = text.replace(reg, (str, css) => {
    css = convert(css);
    css = css.substring(2, str.length - 2);
    fs.writeFileSync(cssFileName, css);
    return '';
  });

  text = text.replace(/(import.*;)\n\n/, str => {
    return `${str}import 'abc.css'`;
  });

  return text.replace(/style={styles.(\w*)}/g, `className='$1'`);
}
// * Find `style={styles.(\w*)}`
// * Replace with `className='$1'`
