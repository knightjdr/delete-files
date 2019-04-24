const fs = require('fs');

// fileAge returns a file's age in seconds.
const fileAge = file => (
  new Promise((resolve, reject) => {
    fs.stat(file, (err, stats) => {
      if (!err) {
        const age = stats.mtime.getTime() / 1000;
        resolve(age);
      } else {
        reject(err);
      }
    });
  })
);

module.exports = fileAge;
