import { combineReducers } from 'redux'
import {userReducer, setUser, closeUser} from '../modules/setUserreducer'

const rootReducer = combineReducers({
    userReducer

})

export default rootReducer