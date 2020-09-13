import { combineReducers } from 'redux'
import {userReducer, setUser, closeUser} from '../modules/setUserreducer'
import {channel_reducer,setCurrentChannel} from '../modules/channelReducer'

const rootReducer = combineReducers({
    userReducer,
    channel_reducer

})

export default rootReducer