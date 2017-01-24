var http = require("http");

newRequest("text/plain");
newRequest("text/html");
newRequest("application/json");

function newRequest(type) {
  var req = http.request({
    method: "GET",
    hostname: "eloquentjavascript.net",
    path: "/author",
    headers: {Accept: type}
  }, function(response) {
    console.log("status code = ", response.statusCode);
    response.on("data", function(chunk) {
      console.log(chunk.toString());
    })
  });
  req.end();
}