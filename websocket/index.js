const WebSocket = require('ws');
const wss = new WebSocket.Server({
  port: 1234
});
wss.broadcast = function broadcast(data) {

};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    wss.clients.forEach(function each(client) {
      if (client != ws) client.send(message);
    });
  });
});