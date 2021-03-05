const {TimeRequest, TimeResponse} = require('./grpc/api/time_pb.js');
const {TimeServiceClient} = require('./grpc/api/time_grpc_web_pb.js');

var client = new TimeServiceClient('http://127.0.0.1:31380');

var lbunix = document.getElementById('lbunix');
var lbutc = document.getElementById('lbutc');

window.getTime = function() {
  var request = new TimeRequest();

  client.getTime(request, {}, (err, response) => {
    lbunix.innerText = response.getUnix();
    lbutc.innerText = response.getUtc();
  });
}
