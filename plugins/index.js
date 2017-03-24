const docker = require('./docker');
const express = require('./express');
const license = require('./license');
const react = require('./react');
const redux = require('./redux');

module.exports = {
  docker,
  express,
  license,
  react,
  redux,

  getPlugins(pieces) {
    const out = [];
    for (const piece of pieces) {
      const pieceName = piece.split('=')[0];
      const pieceArg = piece.split('=')[1];
      if (module.exports[pieceName]) {
        if (Array.isArray(module.exports[pieceName].requires)) {
          for (const requirement of module.exports[pieceName].requires) {
            if (module.exports[requirement]) {
              const req = module.exports[requirement];
              if (!out.includes[req]) {
                out.push(req);
              }
            }
          }
        }

        let pieceToAdd = module.exports[pieceName];
        if (pieceArg && typeof pieceToAdd === 'function') {
          pieceToAdd = pieceToAdd(pieceArg);
        }

        out.push(pieceToAdd);
      }
    }
    return out;
  }
};
