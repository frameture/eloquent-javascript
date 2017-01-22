function newRequest(type) {  
  var req = new XMLHttpRequest();
  req.open("GET", "http://eloquentjavascript.net/author", true);
  req.setRequestHeader("Accept", type);
  req.addEventListener("load", function(e) {
    console.log(req.responseText);
  });
  req.send(null);
}

newRequest("text/plain");
newRequest("text/html");
newRequest("application/json");