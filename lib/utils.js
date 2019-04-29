const chalk = require('chalk');

const message = {
  log: msg => console.log(chalk.green(`${msg}`)),
  success: msg => console.log(chalk.blue(`${msg}`)),
  error: error => console.log(chalk.red(`${error}`)),
};

/**
 * @description 首字母大写
 * @param {string} name
 * @returns
 */
function firstUpperCase(name) {
  let firstLetter = name.slice(0, 1) || '';
  let other = name.slice(1);
  return String(firstLetter).toUpperCase() + other;
}

/**
 * @description 首字母小写
 * @param {String} name
 * @returns
 */
function fisrtLowerCase(name) {
  let firstLetter = name.slice(0, 1) || '';
  let other = name.slice(1);
  return String(firstLetter).toLowerCase() + other;
}

/**
 * @description 驼峰转横杠写法，并将所有的_替换成-
 * @param {String} text
 * @returns
 */
function getKebabCase(text) {
  let t = text || '';
  t = t.replace(/([A-Z])(\w)/g, (match, p1, p2) => `-${p1.toLowerCase()}${p2}`);
  t = t.replace(/_/gm, (match, p1) => '-');
  return t;
}

/**
 * @description 横杠转驼峰写法
 * @param {String} text
 * @returns
 */
function getCamelCase(text) {
  let t = text || '';
  t = t.replace(/[-_](\w)/g, (match, p1) => p1.toUpperCase());
  return t;
}

module.exports = {
  message,
  firstUpperCase,
  fisrtLowerCase,
  getCamelCase,
  getKebabCase,
};
