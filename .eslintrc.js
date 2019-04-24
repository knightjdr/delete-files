module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'jest': true,
    'node': true
  },
  'extends': 'standard',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    "comma-dangle": [2, "always-multiline"],
    "semi": [2, "always"]
  }
}
