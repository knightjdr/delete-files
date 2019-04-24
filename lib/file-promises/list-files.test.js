const mockFS = require('mock-fs');

const listFiles = require('./list-files');

const mockedFileSystem = {
  tmp: {
    folderA: {},
    folderB: {},
    fileC: '',
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('List files', () => {
  describe('folder exists', () => {
    let files;

    beforeAll(async (done) => {
      files = await listFiles('tmp');
      done();
    });

    it('should return a list of folder content', () => {
      const expected = ['fileC', 'folderA', 'folderB'];
      expect(files).toEqual(expected);
    });
  });

  describe('folder does not exist', () => {
    it('should reject when there is an error', async () => (
      expect(listFiles('missing')).rejects.not.toBeNull()
    ));
  });
});
