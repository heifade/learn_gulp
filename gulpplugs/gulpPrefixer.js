// through2 是一个对 node 的 transform streams 简单封装
var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;

// 常量
const PLUGIN_NAME = "gulp-prefixer";

function prefixStream(prefixText) {
  var stream = through();
  stream.write(prefixText);
  return stream;
}

// 插件级别函数 (处理文件)
function gulpPrefixer(prefixText) {
  if (!prefixText) {
    throw new PluginError(PLUGIN_NAME, "Missing prefix text!");
  }
  prefixText = Buffer.from(prefixText); // 预先分配

  // 创建一个让每个文件通过的 stream 通道
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      // 返回空文件
      cb(null, file);
    }
    if (file.isBuffer()) {
      file.contents = Buffer.concat([prefixText, file.contents]);
    }
    if (file.isStream()) {
      file.contents = file.contents.pipe(prefixStream(prefixText));
    }

    cb(null, file);
  });
}

// 暴露（export）插件主函数
module.exports = gulpPrefixer;
