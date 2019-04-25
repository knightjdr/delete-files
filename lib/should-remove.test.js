const MockDate = require('mockdate');

const fileAge = require('./file-promises/file-age');
const { optionHandler, shouldRemove } = require('./should-remove');

jest.mock('./file-promises/file-age');

const currentDate = new Date();
const currentDateInSeconds = currentDate.getTime() / 1000;

MockDate.set(currentDate);

describe('Option handler', () => {
  describe('age', () => {
    it('should return true when no age specified', async (done) => {
      const path = 'file.txt';
      const age = '';
      const remove = await optionHandler.age(path, age);
      expect(remove).toBeTruthy();
      done();
    });

    it('should return true when file age is greater than option', async (done) => {
      fileAge.mockResolvedValue(currentDateInSeconds - 1001);
      const path = 'file.txt';
      const age = 1000;
      const remove = await optionHandler.age(path, age);
      expect(remove).toBeTruthy();
      done();
    });

    it('should return false when file age is less than option', async (done) => {
      fileAge.mockResolvedValue(currentDateInSeconds - 999);
      const path = 'file.txt';
      const age = 1000;
      const remove = await optionHandler.age(path, age);
      expect(remove).toBeFalsy();
      done();
    });
  });

  describe('glob', () => {
    it('should return true when no glob specified', () => {
      const path = 'tmp/file.txt';
      const glob = '';
      expect(optionHandler.glob(path, glob)).toBeTruthy();
    });

    it('should return true when file matches glob', () => {
      const path = 'tmp/file.txt';
      const glob = '^file';
      expect(optionHandler.glob(path, glob)).toBeTruthy();
    });

    it('should return false when file does not match glob', () => {
      const path = 'tmp/keep-file.txt';
      const glob = '^file';
      expect(optionHandler.glob(path, glob)).toBeFalsy();
    });
  });
});

describe('Should remove', () => {
  describe('no options', () => {
    it('should remove file', async (done) => {
      const path = 'tmp/file.txt';
      const remove = await shouldRemove(path);
      expect(remove).toBeTruthy();
      done();
    });
  });

  describe('glob only', () => {
    it('should remove file matching glob', async (done) => {
      const path = 'tmp/file.txt';
      const options = {
        glob: '^file',
      };
      const remove = await shouldRemove(path, options);
      expect(remove).toBeTruthy();
      done();
    });

    it('should not remove file not matching glob', async (done) => {
      const path = 'tmp/keep-file.txt';
      const options = {
        glob: '^file',
      };
      const remove = await shouldRemove(path, options);
      expect(remove).toBeFalsy();
      done();
    });
  });

  describe('age only', () => {
    it('should remove file older than age', async (done) => {
      fileAge.mockResolvedValue(currentDateInSeconds - 1001);
      const path = 'tmp/file.txt';
      const options = {
        age: 1000,
      };
      const remove = await shouldRemove(path, options);
      expect(remove).toBeTruthy();
      done();
    });

    it('should not remove file younger than age', async (done) => {
      fileAge.mockResolvedValue(currentDateInSeconds - 999);
      const path = 'tmp/file.txt';
      const options = {
        age: 1000,
      };
      const remove = await shouldRemove(path, options);
      expect(remove).toBeFalsy();
      done();
    });
  });

  describe('all options', () => {
    it('should remove file matching glob and older than age', async (done) => {
      fileAge.mockResolvedValue(currentDateInSeconds - 1001);
      const path = 'tmp/file.txt';
      const options = {
        age: 1000,
        glob: '^file',
      };
      const remove = await shouldRemove(path, options);
      expect(remove).toBeTruthy();
      done();
    });

    it('should not remove file that does not match glob', async (done) => {
      fileAge.mockResolvedValue(currentDateInSeconds - 1001);
      const path = 'tmp/keep-file.txt';
      const options = {
        age: 1000,
        glob: '^file',
      };
      const remove = await shouldRemove(path, options);
      expect(remove).toBeFalsy();
      done();
    });

    it('should not remove file that is younger than age', async (done) => {
      fileAge.mockResolvedValue(currentDateInSeconds - 999);
      const path = 'tmp/file.txt';
      const options = {
        age: 1000,
        glob: '^file',
      };
      const remove = await shouldRemove(path, options);
      expect(remove).toBeFalsy();
      done();
    });

    it('should not remove file that does not match glob and is younger than age', async (done) => {
      fileAge.mockResolvedValue(currentDateInSeconds - 999);
      const path = 'tmp/keep-file.txt';
      const options = {
        age: 1000,
        glob: '^file',
      };
      const remove = await shouldRemove(path, options);
      expect(remove).toBeFalsy();
      done();
    });
  });
});
