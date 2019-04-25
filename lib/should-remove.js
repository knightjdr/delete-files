const path = require('path');

const fileAge = require('./file-promises/file-age');

const optionOrder = ['glob', 'age'];

const optionHandler = {
  age: async (path, age) => {
    if (!age) {
      return true;
    }
    const currentDate = new Date();
    const lastModified = await fileAge(path);
    return (currentDate.getTime() / 1000) - age > lastModified;
  },
  glob: (filePath, glob) => {
    if (!glob) {
      return true;
    }
    const re = new RegExp(glob);
    const filename = path.basename(filePath);
    return re.test(filename);
  },
};

const shouldRemove = async (path, options = {}) => {
  for (const option of optionOrder) {
    const remove = await optionHandler[option](path, options[option]);
    if (!remove) {
      return false;
    }
  }
  return true;
};

module.exports = {
  optionHandler,
  shouldRemove,
};
