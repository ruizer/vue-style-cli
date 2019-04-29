#!/usr/bin/env node
const package = require('./package.json');
const program = require('commander');
const chalk = require('chalk');
const path = require('path');
const generateComponent = require('./lib/generate-component');
const generateOnlyComponent = require('./lib/generate-only-component');

// 获取真实路径
function getRealPath(_path) {
  let pa = path.resolve('.'); // 当前路径
  if (_path) {
    // 传入path
    pa = path.resolve(pa, _path);
  }
  return pa;
}

program
  .command('create <name>')
  .description('create a vue component with directory')
  .alias('c')
  .option('-p, --path [path]', 'real path; Please use relative paths')
  .option('-o,--only', 'create only component without directory')
  .option('-s,--scoped', 'Scoped CSS')
  .option('-l, --lang [lang]', 'CSS Modules')
  .action((name, cmd) => {
    try {
      cmd.only
        ? generateOnlyComponent(
            name,
            getRealPath(cmd.path),
            cmd.lang,
            cmd.scoped,
          )
        : generateComponent(name, getRealPath(cmd.path), cmd.lang, cmd.scoped);
    } catch (e) {
      console.log(e);
    }
  });

// 其他未知命令
program.arguments('<command>').action(cmd => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});

// 创建其他有用的帮助信息
program.on('--help', () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(
      `vs <command> --help`,
    )} for detailed usage of given command.`,
  );
  console.log();
});

program.commands.forEach(c => c.on('--help', () => console.log()));

program.version(package.version).parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
