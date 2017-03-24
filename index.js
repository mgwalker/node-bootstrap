#! /usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const log = require('./log');
const npm = require('./npm');
const git = require('./git');
const plugins = require('./plugins');

function copyFiles(pieces) {
  const filePieces = pieces.filter(piece => piece.files);
  for (const piece of filePieces) {
    for (const outPath of Object.keys(piece.files)) {
      log.info(`${chalk.cyan('file')} creating ${outPath}`);
      fs.mkdirpSync(path.dirname(outPath));
      fs.copySync(piece.files[outPath], outPath);
    }
  }
  fs.copySync(path.join(__dirname, '.gitignore'), '.gitignore');
  return pieces;
}

function runCLI(pieces) {
  const localPlugins = plugins.getPlugins(pieces);

  npm.init(localPlugins)
    .then(copyFiles)
    .then(npm.install)
    .then(npm.installDev)
    .then(npm.addScripts)
    .then(npm.build)
    .then(git.init)
    .then(git.addAll)
    .then(git.commit)
    .then(() => log.info(chalk.green('Done!')))
    .catch((e) => {
      log.error(e);
    });
}

if (require.main === module) {
  runCLI(process.argv.slice(2));
}
