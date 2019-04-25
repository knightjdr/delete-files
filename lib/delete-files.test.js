const fs = require('fs');
const mockFS = require('mock-fs');

const deleteFiles = require('./delete-files');

const currentDate = new Date();
const expiredDate = new Date();
expiredDate.setSeconds(expiredDate.getSeconds() - 1001);

const mockedFileSystem = {
  '/tmp': {
    folder: mockFS.directory({
      mode: 777,
      items: {},
      mtime: expiredDate,
    }),
    file: mockFS.file({
      mode: '0777',
      content: '',
      mtime: expiredDate,
    }),
    noGlobMatchFolder: mockFS.directory({
      mode: '0755',
      items: {},
      mtime: expiredDate,
    }),
    noGlobMatchFile: mockFS.file({
      content: '',
      mtime: expiredDate,
    }),
    folderNotExpired: mockFS.directory({
      mode: '0755',
      items: {},
      mtime: currentDate,
    }),
    fileNotExpired: mockFS.file({
      content: '',
      mtime: currentDate,
    }),
  },
};
mockFS(mockedFileSystem);

afterAll(() => {
  mockFS.restore();
});

describe('Delete files', () => {
  it('should reject when specified folder does not exist', () => (
    expect(deleteFiles('/missing')).rejects.toEqual(new Error("ENOENT, no such file or directory '/missing'"))
  ));

  describe('valid parent folder', () => {
    beforeAll(async (done) => {
      const options = {
        age: 1000,
        glob: '^f',
      };
      await deleteFiles('/tmp', options);
      done();
    });

    it('should remove expired folder matching glob', () => {
      expect(fs.existsSync('/tmp/folder')).toBeFalsy();
    });

    it('should remove expired file matching glob', () => {
      expect(fs.existsSync('/tmp/file')).toBeFalsy();
    });

    it('should not remove folder that does not match glob', () => {
      expect(fs.existsSync('/tmp/noGlobMatchFolder')).toBeTruthy();
    });

    it('should not remove file that does not match glob', () => {
      expect(fs.existsSync('/tmp/noGlobMatchFile')).toBeTruthy();
    });

    it('should not remove folder that is not expired', () => {
      expect(fs.existsSync('/tmp/folderNotExpired')).toBeTruthy();
    });

    it('should not remove file that is not expired', () => {
      expect(fs.existsSync('/tmp/fileNotExpired')).toBeTruthy();
    });
  });
});
