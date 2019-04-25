const mockFS = require('mock-fs');

const exists = require('./exists');

const mockedFileSystem = {
  tmp: {
    fileA: '',
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Exists', () => {
  it('should resolve when a file exists', () => (
    expect(exists('tmp/fileA')).resolves.toBeUndefined()
  ));

  it('should reject when a file does not exist', () => (
    expect(exists('tmp/fileB')).rejects.toEqual(new Error("ENOENT, no such file or directory 'tmp/fileB'"))
  ));
});
