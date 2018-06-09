const dirTree = require('directory-tree');
const fs = require('fs');
const tree = dirTree('../rabbit-mermaid', {exclude:[/node_modules/, /coverage/, /.git/, /.idea/]});
fs.writeFile('exampleCity.js', JSON.stringify(tree), 'utf8', () => {});
module.exports = {
  dirTree,
}
