import { 
    EMAIL_CHANGE_LOGIN,
    PASSWORD_CHANGE_LOGIN,
    EMPTY_LOGIN_FORM
} from "./action.type"
export default (state, action) =>{
    switch (action.type){
        case EMAIL_CHANGE_LOGIN:
            return {...state, email: action.payload}  
        case PASSWORD_CHANGE_LOGIN:
            return {...state, password: action.payload}  
        case EMPTY_LOGIN_FORM:
            return {
                email: '',
                password: ''
            }
    }
}