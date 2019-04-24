const fs = require('fs');

const listFiles = dir => (
  new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (!err) {
        resolve(files);
      } else {
        reject(err);
      }
    });
  })
);

module.exports = listFiles;
