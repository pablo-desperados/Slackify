import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Authorization/Login.js'
import Register from './components/Authorization/Register.js'
import {BrowserRouter, Switch, Route} from "react-router-dom"

const  Root = () =>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    </BrowserRouter>
)
ReactDOM.render(<Root/>, document.getElementById('root'));
registerServiceWorker();
