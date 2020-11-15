import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Home from './features/home/page/home';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            pageRouted: Home
        };
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
