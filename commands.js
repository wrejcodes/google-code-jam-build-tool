const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const options = {};

const cmd = process.argv[2];

for (let i = 0; i < process.argv.length; i += 1) {
  const match = process.argv[i].match(/^--(.*)/);
  if (match) {
    options[match[1]] = process.argv[i + 1];
  }
}

const newProj = (options) => {
  if (options.name) {
    const folder = path.join(__dirname, options.name);
    fs.mkdir(path.join(folder, 'src'), {recursive: true}, (err) => {
      if(err) throw err;
      fs.open(path.join(folder, 'src/in.txt'), 'w', err => {if(err) throw err;});
      fs.open(path.join(folder, 'src/out.txt'), 'w', err => {if(err) throw err;});
      fs.copyFile(path.join(__dirname, 'main.js.template'), path.join(folder, 'src/main.js'), err => {if(err) throw err;});
    });
    fs.mkdir(path.join(folder, 'dist'), {recursive: true}, err => { if(err) throw err;});
  } else {
    throw new Error('A new project must have a name');
  }
}

const runProj = (options) => {
  if (options.name) {
    const folder = path.join(__dirname, `${options.name}/src`);
    const command = `${process.argv[0]} ${path.join(folder, 'main.js')} < ${path.join(folder, 'in.txt')} > ${path.join(folder, 'out.txt')}`;
    exec(command, (err) => {if (err) throw err;});
  } else {
    throw new Error('You must specify a project to run');
  }
}

switch(cmd) {
  case 'new': newProj(options);
  break;
  case 'run': runProj(options);
  break;
  default:
  throw new Error(`Unknown command ${cmd}`)
  break;
}
