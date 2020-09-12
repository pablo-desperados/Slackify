import {createStore} from 'redux'
import rootReducer from './rootReducer'
import {composeWithDevTools} from 'redux-devtools-extension'

let configureStore = () =>{
  let store = createStore(rootReducer, composeWithDevTools())
  return store
}

export default configureStore