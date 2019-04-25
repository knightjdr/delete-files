# Delete files

Asynchronously delete files in node.

## Install

### Yarn
```
yarn add delete-files
```

### NPM
```
npm install delete-files --save 
```

## Usage

```
deleteFiles(<folder>, [options]);
```

### Example

Remove all files/folders in `/dir` beginning with `tmp` that are older than a day (age is specified in seconds).

```
const deleteFiles = require('delete-files');

const options = {
  age: 86400,
  glob: '^tmp',
};

deleteFiles('/dir', options);
```

If a glob is specified and a file does not match, no further options will be checked and the file will not
be removed.

## Implementation

The path for the directory to search must be specified with the full path. The age of a file is determined from the `mtime` (last modified). Files and folders are removed with the fs-extra `remove` function which is the equivalent of `rm -rf`.