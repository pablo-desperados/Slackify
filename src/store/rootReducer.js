import { combineReducers } from 'redux'
import {userReducer, setUser} from '../modules/setUserreducer'

const rootReducer = combineReducers({
    userReducer,
    setUser

})

export default rootReducer