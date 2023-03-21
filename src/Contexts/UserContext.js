import React,{useReducer} from "react"
export const UserContext=React.createContext()

const initialState={
    admin:JSON.parse(sessionStorage.getItem('admin'))||null,
    tour:JSON.parse(sessionStorage.getItem('tour'))!==null && JSON.parse(sessionStorage.getItem('tour'))!==undefined?JSON.parse(sessionStorage.getItem('tour')):true
}

function reducer(state, action){
    switch(action.type){
        case 'SET_ADMIN':
            sessionStorage.setItem('admin',JSON.stringify(action.payload))
            return{
                admin:action.payload
            }
        case 'SET_Tour':
            sessionStorage.setItem('tour',JSON.stringify(action.payload))
            return{
                tour:action.payload
            }    
        default:
            throw new Error()      
    }
}

function UserContextProvider(props){
    const [state, dispatch] = useReducer(reducer,initialState);
    // console.log(state)
    return (<UserContext.Provider value={[state,dispatch]}>
        {props.children}
    </UserContext.Provider>);
}
export default UserContextProvider