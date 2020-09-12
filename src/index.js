import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Authorization/Login.js'
import Register from './components/Authorization/Register.js'
import {BrowserRouter, Switch, Route, withRouter} from "react-router-dom"
import "semantic-ui-css/semantic.min.css"
import firebase from "./firebase.js"
import {Provider, connect} from 'react-redux'
import configureStore from './store/configureStore.js'
import {setUser} from './modules/setUserreducer.js'



const store= configureStore()


class Root extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user=>{
            if(user){
                this.props.setUser(user)
                this.props.history.push('/');
            }
        })
    }

    render(){
        return(

            <Switch>
                <Route exact path="/" component={App}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>

        )
    }
}

const RootAuth = withRouter(connect(null,{setUser})(Root))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <RootAuth/>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();


