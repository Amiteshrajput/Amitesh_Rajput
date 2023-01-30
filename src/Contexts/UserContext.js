import React,{useReducer} from "react"
export const UserContext=React.createContext()

const initialState={
    // loggedIn:JSON.parse(sessionStorage.getItem('logged'))||null,
    admin:JSON.parse(sessionStorage.getItem('admin'))||null
}

function reducer(state, action){
    switch(action.type){
        // case 'SET_LOG':
        //     sessionStorage.setItem('logged',JSON.stringify(action.payload))
        //     return{
        //         loggedIn:action.payload
        //     }
        case 'SET_ADMIN':
            sessionStorage.setItem('admin',JSON.stringify(action.payload))
            return{
                admin:action.payload
            }
        default:
            throw new Error()      
    }
}

function UserContextProvider(props){
    const [state, dispatch] = useReducer(reducer,initialState);
    console.log(state)
    return (<UserContext.Provider value={[state,dispatch]}>
        {props.children}
    </UserContext.Provider>);
}
export default UserContextProvider