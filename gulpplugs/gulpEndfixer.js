const through = require("through2");
const merge2 = require("merge2");

module.exports = function(value) {
  return through({ objectMode: true }, function(chunk, enc, callback) {
    value = Buffer.from(value); // 预先分配
    if (chunk.isNull()) {
      callback(null, chunk);
    } else {
      if (chunk.isBuffer()) {
        console.log("buffer");
        chunk.contents = Buffer.concat([chunk.contents, value]);
      }
      if (chunk.isStream()) {
        console.log("stream");
        let stream1 = through();
        stream1.write(value);
        stream1.end();

        chunk.contents = merge2(chunk.contents, stream1);

        callback(null, chunk);
      }
    }
  });
};
