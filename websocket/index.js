const WebSocket = require('ws');
const wss = new WebSocket.Server({
  port: 1234
});

/**
 * Der Websocket Server leitet die Nachrichten der clients an
 * jeweils alle anderen clients weiter
*/
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    wss.clients.forEach(function each(client) {
      if (client != ws) client.send(message);
    });
  });
});