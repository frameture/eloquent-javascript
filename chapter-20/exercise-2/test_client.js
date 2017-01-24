var http = require("http");

newRequest("/public/views/index.html", "Expect true");
newRequest("/../../../etc/passwd", "Expect false");

function newRequest(url, test) {
  var req = http.request({
  hostname: "localhost",
  path: url,
  port: 8000,
  method: "GET"
  }, function(response) {
    response.on("data", function(data) {
      console.log(data.toString(), test);
    })
  });
  req.end();
}