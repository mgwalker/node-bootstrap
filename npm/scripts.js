const fs = require('fs');
const chalk = require('chalk');
const log = require('../log');

function buildEslintScript(pieces) {
  const eslintPaths = pieces.reduce((paths, piece) => {
    if (Array.isArray(piece.eslintPaths)) {
      return [...paths, ...piece.eslintPaths];
    }
    return paths;
  }, []);
  return `eslint --fix ${eslintPaths.map(path => `'${path}'`).join(' ')}`;
}

module.exports = function addNPMscripts(pieces) {
  const scriptPieces = pieces.filter(piece => piece.scripts);
  const buildComponents = [];

  const pkgJson = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf8' }));
  for (const piece of scriptPieces) {
    for (const script of Object.keys(piece.scripts)) {
      log.info(`${chalk.cyan('npm script')} added ${script}`);
      pkgJson.scripts[script] = piece.scripts[script];
    }

    if (piece.buildComponents) {
      buildComponents.push(...piece.buildComponents);
    }
  }
  pkgJson.scripts.build = buildComponents.map(b => `npm run ${b}`).join(' && ');
  pkgJson.scripts.lint = buildEslintScript(pieces);
  log.info(`${chalk.cyan('npm script')} added build`);
  log.info(`${chalk.cyan('npm script')} added lint`);
  fs.writeFileSync('./package.json', `${JSON.stringify(pkgJson, null, 2)}\n`);
  return pieces;
};
