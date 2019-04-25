const fs = require('fs-extra');

const removePath = path => (
  new Promise((resolve, reject) => {
    fs.remove(path, (err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  })
);

module.exports = removePath;

/* This is an alternative to using fs-extra, but can't be used with mock-fs.
const { spawn } = require('child_process');

const removePath = path => (
  new Promise((resolve, reject) => {
    const rm = spawn('rm', ['-rf', path]);
    rm.on('error', (err) => {
      reject(err);
    });
    rm.on('exit', () => {
      resolve();
    });
  })
);

module.exports = removePath;
*/
