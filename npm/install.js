const chalk = require('chalk');
const log = require('../log');
const promisedExec = require('../promisedExec');

function getNPMDepList(pieces, which) {
  const dependencies = pieces.reduce((set, piece) => {
    piece.npm[which].forEach(mod => set.add(mod));
    return set;
  }, new Set());
  return [...dependencies];
}

function npmInstall(modules, saveExt = false) {
  log.info(`${chalk.cyan('npm install')} installing ${modules.length} ${saveExt ? `${saveExt} ` : ''}dependencies`);
  return promisedExec(`npm install ${modules.join(' ')} --save${saveExt ? `-${saveExt}` : ''}`);
}

function filterHasNpm(pieces, deps = 'deps') {
  return pieces.filter(piece => piece.npm && piece.npm[deps]);
}

function install(pieces) {
  const pieceModules = getNPMDepList(filterHasNpm(pieces), 'deps');
  return npmInstall(pieceModules).then(() => pieces);
}

function installDev(pieces) {
  const defaultDevDependences = ['eslint', 'eslint-config-airbnb-base', 'eslint-plugin-import'];
  const pieceModules = getNPMDepList(filterHasNpm(pieces, 'devDeps'), 'devDeps');
  return npmInstall([...defaultDevDependences, ...pieceModules], 'dev').then(() => pieces);
}

module.exports = {
  install,
  installDev
};
