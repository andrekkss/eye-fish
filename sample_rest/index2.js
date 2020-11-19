const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const tty = "/dev/ttyACM0"; 
//O tty vario na rasp-berry para localizo:
//ls /dev/tty*
const port = new SerialPort(tty, { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));


port.on("open", () => {
    console.log('serial port open');
});

parser.on('data', data => {
    console.log('value from arduino: ', data);
});


