const chalk = require('chalk');
const log = require('../log');
const promisedExec = require('../promisedExec');

function init(pieces) {
  log.info(`${chalk.cyan('git')} init`);
  return promisedExec('git init').then(() => pieces);
}

function addAll(pieces) {
  log.info(`${chalk.cyan('git')} add all files`);
  return promisedExec('git add .').then(() => pieces);
}

function commit(pieces) {
  log.info(`${chalk.cyan('git')} commit`);
  return promisedExec('git commit -m "Initial commit"').then(() => pieces);
}

module.exports = {
  addAll,
  commit,
  init
};
