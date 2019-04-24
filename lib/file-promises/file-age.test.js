const mockFS = require('mock-fs');

const fileAge = require('./file-age');

const currentDate = new Date();
const currentDateInSeconds = currentDate.getTime() / 1000;

const mockedFileSystem = {
  tmp: {
    folderA: mockFS.directory({
      mode: '0755',
      items: {},
      mtime: currentDate,
    }),
    fileB: mockFS.file({
      content: '',
      mtime: currentDate,
    }),
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('File age', () => {
  it('should get the age of a folder', () => (
    expect(fileAge('tmp/folderA')).resolves.toBe(currentDateInSeconds)
  ));

  it('should get the age of a file', () => (
    expect(fileAge('tmp/fileB')).resolves.toBe(currentDateInSeconds)
  ));

  it('should reject when a file does not exist', async () => (
    expect(fileAge('tmp/missing')).rejects.not.toBeNull()
  ));
});
