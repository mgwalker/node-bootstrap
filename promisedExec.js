const exec = require('child_process').exec;

module.exports = function promisedExec(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
