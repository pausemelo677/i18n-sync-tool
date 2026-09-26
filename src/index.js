const fs = require('fs');
const path = require('path');
const glob = require('glob');
const chalk = require('chalk');

async function checkTranslations(options = {}) {
  const localesPath = options.path || './locales';
  const srcPath = options.src || './src';
  
  console.log(chalk.yellow(`Scanning ${srcPath}...`));
  const files = glob.sync(`${srcPath}/**/*.{js,jsx,ts,tsx}`);
  console.log(chalk.gray(`Found ${files.length} files`));
  
  const usedKeys = new Set();
  const keyRegex = /t\(['"]([^'"]+)['"]\)/g;
  
  files.forEach(file => {
    try {
      const content = fs.readFileSync(file, 'utf8');
      let match;
      while ((match = keyRegex.exec(content)) !== null) {
        if (match[1]) usedKeys.add(match[1]);
      }
    } catch (e) {}
  });
  
  console.log(chalk.green(`Found ${usedKeys.size} keys`));
  return { usedKeys: Array.from(usedKeys) };
}

module.exports = { checkTranslations };
