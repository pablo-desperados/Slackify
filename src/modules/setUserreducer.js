

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
        case CLOSE_USER:
            return{
                ...initialState,
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


const CLOSE_USER='CLOSE_USER'

const closeUser = ()=>{
    return{
        type: CLOSE_USER

    }
}


export{
    userReducer,setUser, closeUser
}