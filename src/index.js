import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';

import {BrowserRouter, Switch, Route} from "react-router-dom"

const  Root = () =>(
    <BrowserRouter>
        <Switch>
            <Route path="/" component={App}/>
        </Switch>
    </BrowserRouter>
)
ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
