const fileAge = require('./file-promises/file-age');

const shouldRemove = async (path, options) => {
  try {
    if (options.glob) {
      const re = new RegExp(options.glob);
      if (!re.test(path)) {
        return false;
      }
    }
    if (options.age) {
      const age = await fileAge(path);
      if (age > options.age) {
        return true;
      }
    }
    return false;
  } catch (err) {
    throw err;
  }
};

module.exports = shouldRemove;
