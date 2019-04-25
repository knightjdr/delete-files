const fs = require('fs');

const exists = filePath => (
  new Promise((resolve, reject) => {
    fs.access(filePath, (err) => {
      if (!err) {
        resolve();
      } else {
        reject(err);
      }
    });
  })
);

module.exports = exists;
