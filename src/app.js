import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import AppBar from './components/app-bar';
import Home from './features/home/page/home';
import Welcome from './components/welcome';

const { remote } = require('electron')
var window = remote.getCurrentWindow()

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageRouted: Home
        };
    }
    
    componentDidMount(){
        window.maximize()
    }

    routePage = (page) => {
        this.setState({pageRouted: page})
    }

    render() {
        return (
            <div>
                <Dialog fullScreen={Boolean("true")} open={Boolean("true")}>
                    <DialogContent className={'mainContent'}>
                        <Router>
                            <Route component={this.state.pageRouted}/>
                        </Router>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}
