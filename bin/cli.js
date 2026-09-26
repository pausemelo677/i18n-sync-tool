#!/usr/bin/env node
const { program } = require('commander');
const chalk = require('chalk');
const { checkTranslations } = require('../src/index');

program
  .name('i18n-sync')
  .description('Detect missing i18n keys in Next.js and sync with Lingo.dev')
  .version('1.0.0');

program
  .command('check')
  .description('Check for missing translation keys')
  .option('-p, --path <path>', 'Path to locales folder', './locales')
  .option('-s, --src <src>', 'Path to src folder', './src')
  .action(async (options) => {
    console.log(chalk.blue('🔍 Checking translations...'));
    await checkTranslations(options);
  });

program
  .command('sync')
  .description('Sync missing keys to Lingo.dev')
  .option('--api-key <key>', 'Lingo.dev API key')
  .action(async (options) => {
    console.log(chalk.green('🔄 Syncing with Lingo.dev...'));
    console.log('API Key:', options.apiKey ? '***' : 'Not provided');
  });

program.parse();
