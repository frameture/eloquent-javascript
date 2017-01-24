function urlToPath(url) {
  var path = require("url").parse(url).pathname;
  path = "." + decodeURIComponent(path);
  console.log("path=", path);
  if (/(\.\.(\\|\/))/.test(path))
    return "false";
  return "true";
}

var http = require("http");

http.createServer(function(req, res) {
  console.log("url = ", req.url);
  res.writeHeader(200, {"Content-Type": "text/plain"});
  res.write(urlToPath(req.url));
  res.end();
}).listen(8000);