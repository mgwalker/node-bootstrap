const chalk = require('chalk');
const log = require('../log');
const promisedExec = require('../promisedExec');
const install = require('./install');
const scripts = require('./scripts');

const dockerPlugin = require('../plugins/docker');

function init(pieces) {
  return promisedExec('npm init --yes').then(() => pieces);
}

function build(pieces) {
  if (pieces.includes(dockerPlugin)) {
    log.info(`${chalk.cyan('npm run build')} skipping build because that should happen in docker`);
    return Promise.resolve();
  }
  log.info(`${chalk.cyan('npm run build')} running initial build`);
  return promisedExec('npm run build').then(() => pieces);
}

module.exports = {
  addScripts: scripts,
  build,
  init,
  install: install.install,
  installDev: install.installDev
};
