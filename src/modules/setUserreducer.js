

const initialState ={
    currentUser: null,
    isLoading: true
}

const userReducer =(state=initialState,action)=>{
    switch(action.type){
        case SET_USER:
            return{
                currentUser: action.user,
                isLoading:false
            }
        default:
            return state
    }
}

const SET_USER = 'SET_USER'

const setUser=user=>{
    return{
        type: SET_USER,
        user
    }
}
export{
    userReducer,setUser
}