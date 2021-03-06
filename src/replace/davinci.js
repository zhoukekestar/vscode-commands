const vscode = require('vscode');
const fs = require('fs');

const funs = [];

// replace davinci header
funs.push(text => {
  return text.replace(
`
// generated by Davinci

'use strict';
import {createElement, Component, render} from 'rax';
import {View, Link, Text} from '@ali/rax-components';
import Picture from '@ali/rax-picture';`
,
`import {
  createElement,
  Component,
  render } from '@ali/cox';
import {
  View,
  Text,
  Image,
  Link,
  Button,
  TouchableHighlight as Touchable,
  RefreshControl,
  RecyclerView,
  ScrollView,
} from '@ali/cox-components';`)
});

// remove mock data
funs.push(text => {
  return text.replace('let mockData = [{}];', '').replace('let dataSource = this.props.data[0];', '')
})

// export mod
funs.push(text => {
  return text.replace('render(<Mod data={mockData} />);', 'export default Mod;')
})

// replace Picture to Image
funs.push(text => {
  return text.replace(/Picture/g, 'Image');
})

// funs.push((text, filename) => {
//   fs.writeFileSync(filename.replace('.js', '.css'), 'abc')
//   return text;
// })

module.exports = function(text, filename) {

  for (let i = 0; i < funs.length; i++) {
    try {
      text = funs[i](text, filename);
    } catch (e) {
      console.log(e);
    }
  }

  return text;
}