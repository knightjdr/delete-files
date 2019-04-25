const path = require('path');

const exists = require('./file-promises/exists');
const listFiles = require('./file-promises/list-files');
const removePath = require('./file-promises/remove-path');
const { shouldRemove } = require('./should-remove');

const deleteFiles = async (folder, options) => {
  try {
    await exists(folder);
    const contents = await listFiles(folder);
    await Promise.all(contents.map(async (filePath) => {
      const fullPath = path.join(folder, filePath);
      const remove = await shouldRemove(fullPath, options);
      if (remove) {
        await removePath(fullPath);
      }
    }));
  } catch (err) {
    throw err;
  }
};

module.exports = deleteFiles;
