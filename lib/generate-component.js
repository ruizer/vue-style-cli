const mkdirp = require("mkdirp");
const tplApply = require("tpl_apply");
const path = require("path");
const fs = require("fs");

const {
  message,
  firstUpperCase,
  fisrtLowerCase,
  getCamelCase,
  getKebabCase,
} = require("./utils");

function generatePath(pa, name) {
  return path.resolve(pa, `./${name}`);
}
/**
 * @description 生成vue组件，文件夹格式
 * @param {String} name 组件名称
 * @param {String} _path 组件生成地址
 * @param {String} lang 组件内部css扩展语言
 * @param {Boolean} scoped css作用域，是否只在此组件有效
 * @param {Boolean} ts vue组件是否使用ts
 */
module.exports = (name, _path, lang, scoped, ts) =>
  new Promise((resolve) => {
    name = getKebabCase(fisrtLowerCase(name));
    message.log(`${name} is generating.....`);
    filePath = generatePath(_path, name);

    let exists = false;
    try {
      fs.accessSync(filePath);
      exists = true;
    } catch (error) {}
    if (exists) {
      message.error(`Unable to create: ${filePath} folder already exists`);
      return resolve();
    }

    // 创建文件夹
    mkdirp(filePath, (err) => {
      if (err) {
        console.error(err);
        return resolve();
      }

      const data = {
        kebabCaseName: name,
        camelCaseName: firstUpperCase(getCamelCase(name)),
        lang: lang || 'css',
        scoped: scoped ? "scoped" : "",
      };
      let tplPath;
      let tpls;
      if (ts === "html") {
        tplPath = path.join(__dirname, "../templates/MultiFile/HtmlTemplate");
        tpls = [
          { source: "html.tpl", dest: `${name}.html` },
          { source: "css.tpl", dest: `${name}.${lang ? lang : "css"}` },
          { source: "ts.tpl", dest: `${name}.ts` },
          { source: "index.tpl", dest: "index.ts" },
        ];
      } else {
        tplPath = path.join(__dirname, "../templates/MultiFile/VueTemplate");
        tpls = [
          { source: "css.tpl", dest: `index.${lang ? lang : "css"}` },
          { source: ts ? "vueTs.tpl" : "vue.tpl", dest: `index.vue` },
        ];
      }

      tpls.forEach(({ source, dest }) => {
        tplApply.tpl_apply(
          path.join(tplPath, source),
          data,
          path.join(filePath, dest)
        );
      });

      message.success(`generate ${filePath} success`);
      resolve();
    });
  });
