const listFiles = require('./file-promises/list-files');
const removePath = require('./file-promises/remove-path');
const shouldRemove = require('./should-remove');

const deleteFiles = async (folder, options) => {
  try {
    const contents = await listFiles(folder);
    await Promise.all(contents.map(async (path) => {
      const remove = await shouldRemove(path, options);
      if (remove) {
        await removePath(path);
      }
    }));
  } catch (err) {
    throw err;
  }
};

module.exports = deleteFiles;
