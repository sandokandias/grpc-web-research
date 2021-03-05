const {TimeRequest, TimeResponse} = require('./grpc/api/time_pb.js');
const {TimeServiceClient} = require('./grpc/api/time_grpc_web_pb.js');

var client = new TimeServiceClient('http://' + window.location.host);

var lbunix = document.getElementById('lbunix');
var lbutc = document.getElementById('lbutc');

window.getTime = function() {
  var request = new TimeRequest();

  client.get_time(request, {}, (err, response) => {
    lbunix.innerText = response.getUnix();
    lbutc.innerText = response.getUtc();
  });
};
