const fs = require('fs');
const request = require('request-promise');
const chalk = require('chalk');
const log = require('../log');
const promisedExec = require('../promisedExec');

const dockerPlugin = require('../plugins/docker');

function getNPMDepList(pieces, which) {
  const dependencies = pieces.reduce((set, piece) => {
    piece.npm[which].forEach(mod => set.add(mod));
    return set;
  }, new Set());
  return [...dependencies];
}

function addDepsToPackageJSON(modules, saveExt = false) {
  log.info(`${chalk.cyan('npm install')} adding ${modules.length} ${saveExt ? `${saveExt} ` : ''}dependencies`);
  const promises = [];

  for (const module of modules) {
    log.info(`${chalk.cyan('npm install')} --> ${module}`);
    promises.push(request.get(`https://registry.npmjs.org/${module}/latest`, { json: true }));
  }

  return Promise.all(promises).then((args) => {
    const dependencies = args.sort((a, b) => a.name > b.name).map(arg => ({ [arg.name]: arg.version }));
    const propertyName = `${saveExt || ''}${saveExt ? 'D' : 'd'}ependencies`;
    const json = Object.assign(...dependencies);

    const packageJSON = JSON.parse(fs.readFileSync('package.json', { encoding: 'utf-8' }));
    packageJSON[propertyName] = json;
    fs.writeFileSync('package.json', JSON.stringify(packageJSON, false, 2), { encoding: 'utf-8' });
  });
}

function npmInstall(modules, saveExt = false) {
  log.info(`${chalk.cyan('npm install')} installing ${modules.length} ${saveExt ? `${saveExt} ` : ''}dependencies`);
  return promisedExec(`npm install ${modules.join(' ')} --save${saveExt ? `-${saveExt}` : ''}`);
}

function getInstallFn(pieces) {
  if (pieces.includes(dockerPlugin)) {
    return addDepsToPackageJSON;
  }
  return npmInstall;
}

function filterHasNpm(pieces, deps = 'deps') {
  return pieces.filter(piece => piece.npm && piece.npm[deps]);
}

function install(pieces) {
  const pieceModules = getNPMDepList(filterHasNpm(pieces), 'deps');
  return getInstallFn(pieces)(pieceModules).then(() => pieces);
}

function installDev(pieces) {
  const defaultDevDependences = ['eslint', 'eslint-config-airbnb-base', 'eslint-plugin-import'];
  const pieceModules = getNPMDepList(filterHasNpm(pieces, 'devDeps'), 'devDeps');
  return getInstallFn(pieces)([...defaultDevDependences, ...pieceModules], 'dev').then(() => pieces);
}

module.exports = {
  install,
  installDev
};
