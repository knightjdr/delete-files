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
