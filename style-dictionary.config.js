const StyleDictionary = require('style-dictionary');

// Custom transforms
StyleDictionary.registerTransform({
  name: 'attribute/cti',
  type: 'attribute',
  transformer: function(token) {
    const keys = token.path;
    return {
      category: keys[0],
      type: keys[1],
      item: keys[2],
      subitem: keys[3],
      state: keys[4]
    };
  }
});

// Custom formats
StyleDictionary.registerFormat({
  name: 'css/variables',
  formatter: function(dictionary, config) {
    return `:root {\n${dictionary.allTokens.map(token => 
      `  --${token.name}: ${token.value};`
    ).join('\n')}\n}`;
  }
});

StyleDictionary.registerFormat({
  name: 'typescript/es6-declarations',
  formatter: function(dictionary, config) {
    return `export const tokens = {\n${dictionary.allTokens.map(token => 
      `  '${token.name}': '${token.value}'`
    ).join(',\n')}\n} as const;\n\nexport type TokenName = keyof typeof tokens;`;
  }
});

module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: 'dist/scss/',
      files: [{
        destination: '_variables.scss',
        format: 'scss/variables'
      }]
    },
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
      }]
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/js/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/es6'
      }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'src/',
      files: [{
        destination: 'tokens.ts',
        format: 'typescript/es6-declarations'
      }]
    }
  }
}; 