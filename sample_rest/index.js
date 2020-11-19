const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const tty = "/dev/cu.usbmodem14201"; 
//O tty vario na rasp-berry para localizo:
//ls /dev/tty*
const port = new SerialPort(tty, { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));
const server = http.createServer();


server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

wsServer.on('request', function(request) {
  const connection = request.accept(null, request.origin);
  console.log("conectou");
  port.on("open", () => {
    console.log('serial port open');
  });
  
  parser.on('data', data => {
    connection.send(data);
    console.log('value from arduino: ', data);
  });
});


