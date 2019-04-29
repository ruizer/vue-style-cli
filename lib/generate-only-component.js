const tplApply = require('tpl_apply');
const path = require('path');
const fs = require('fs');

const {
  message,
  fisrtLowerCase,
  getKebabCase,
} = require('./utils');

/**
 * @description 生成vue组件，文件夹格式
 * @param {String} name 组件名称
 * @param {String} _path 组件生成地址
 * @param {String} lang 组件内部css扩展语言
 * @param {Boolean} scoped css作用域，是否只在此组件有效
 */
module.exports = (name, _path, lang, scoped) =>
  new Promise(resolve => {
    name = getKebabCase(fisrtLowerCase(name));
    message.log(`${name} is generating.....`);
    filePath = path.resolve(_path, `./${name}.vue`);

    let exists = false;
    try {
      fs.accessSync(filePath);
      exists = true;
    } catch (error) {}
    if (exists) {
      message.error(`Unable to create: ${filePath} file already exists`);
      return resolve();
    }

    const data = {
      kebabCaseName: name,
      lang,
      scoped: scoped ? ' scoped' : '',
    };
    const tplPath = path.join(__dirname, '../templates');
    const tpls = [
      { source: 'vue.tpl', dest: `${name}.vue` },
      { source: 'index.tpl', dest: 'index.js' },
    ];

    tpls.forEach(({ source, dest }) => {
      tplApply.tpl_apply(
        path.join(tplPath, source),
        data,
        path.join(_path, dest),
      );
    });

    message.success(`generate ${filePath} success`);
    resolve();
  });
