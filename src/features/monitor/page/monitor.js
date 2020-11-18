import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Line } from "react-chartjs-2";
import { config, dataConfig } from '../platform/monitor';
import Typography from '@material-ui/core/Typography';
import "chartjs-plugin-streaming";

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const tty = "/dev/ttyACM0"; 
//O tty vario na rasp-berry para localizo:
//ls /dev/tty*
const port = new SerialPort(tty, { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));

// Read the port data
port.on("open", () => {
  console.log('serial port open');
});

const useStyles = makeStyles(() => ({
    root: {
        width: '100% !important',
        height: '100% !important',
        backgroundColor: "#f2f2f2",
    },
    container: {
      padding: 8,
      width: '92% !important',
      height: '50% !important',
    }
}));

export default function Monitor(){
    const [ph, setPh] = useState(0.0)
    const [data, setData] = useState(dataConfig);
    const [options, setOptions] = useState(config(refresh));
    
    function refresh(){
      parser.on('data', data =>{
        const ph = parseFloat(data)
        setPh(ph);
        data.datasets[0].data.push({
            x: Date.now(),
            y: ph
        });
      });
      //const ph = randomFloat(0,10)
      //setPh(ph);
      //data.datasets[0].data.push({
      //    x: Date.now(),
      //    y: ph
      //});
    }

    const classes = useStyles();
    return (
        <div className={classes.root}>
          <div className={classes.container}>
            <Typography variant="h6" gutterBottom>
              PH atual: {ph.toFixed(2)}
            </Typography>
            <Line legend={{ display: false }} data={data} options={options}/>
          </div>
        </div>
    );
}
