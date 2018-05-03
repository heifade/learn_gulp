let through = require("through2");

module.exports = function(value) {
  return through.obj(function(chunk, enc, callback) {
    value = Buffer.from(value); // 预先分配
    if (chunk.isNull()) {
      callback(null, chunk);
    } else {
      if (chunk.isBuffer()) {
        chunk.contents = Buffer.concat([chunk.contents, value]);
      }
      if (chunk.isStream()) {
        let through = through();
        through.write(value);
        chunk.contents = through.pipe(chunk.contents);
      }
      callback(null, chunk);
    }
  });
};
