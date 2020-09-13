
const initialChannelState = {
    currentChannel: null,
    isPrivateChannel: false
  };
  const channel_reducer = (state=initialChannelState, action)=>{
      switch(action.type){
          case SET_CURRENT_CHANNEL:
          return{
              ...state,
              currentChannel: action.channel
          }
          case SET_PRIVATE_CHANEL:
              return{
                  ...state,
                  isPrivateChannel: action.isPrivateChannel
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

  const SET_PRIVATE_CHANEL = 'SET_PRIVATE_CHANNEL'
  const setPrivateChannel = isPrivateChannel=>{
    return{
        type: SET_PRIVATE_CHANEL,
        isPrivateChannel
    }
  }

export{
    channel_reducer,setCurrentChannel, setPrivateChannel
}