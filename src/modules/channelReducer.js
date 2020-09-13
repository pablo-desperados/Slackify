
const initialChannelState = {
    currentChannel: null
  };
  const channel_reducer = (state=initialChannelState, action)=>{
      switch(action.type){
          case SET_CURRENT_CHANNEL:
          return{
              ...state,
              currentChannel: action.channel
          }
          default:
              return state
      }
  }

  const SET_CURRENT_CHANNEL='SET_CURRENT_CHANNEL'

  const setCurrentChannel = channel=>{
      return{
          type: SET_CURRENT_CHANNEL,
          channel
  
      }
  }

export{
    channel_reducer,setCurrentChannel
}