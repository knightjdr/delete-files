const fs = require('fs');
const mockFS = require('mock-fs');

const removePath = require('./remove-path');

const mockedFileSystem = {
  '/tmp': {
    folderA: {
      fileA: '',
    },
    fileB: '',
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Remove path', () => {
  describe('folder', () => {
    beforeAll(async (done) => {
      await removePath('/tmp/folderA');
      done();
    });

    it('should remove the folder', () => {
      expect(fs.existsSync('/tmp/folderA')).toBeFalsy();
    });
  });

  describe('file', () => {
    beforeAll(async (done) => {
      await removePath('/tmp/fileB');
      done();
    });

    it('should remove the file', () => {
      expect(fs.existsSync('/tmp/fileB')).toBeFalsy();
    });
  });
});
