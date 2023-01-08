import { 
    NAME_CHANGE_REGISTER,
    EMAIL_CHANGE_REGISTER,
    PASSWORD_CHANGE_REGISTER,
    CONFIRM_PASSWORD_CHANGE_REGISTER,
    EMPTY_REGISTER_FORM
} from "./action.type"
export default (state, action) =>{
    switch (action.type){
        case NAME_CHANGE_REGISTER:
            return {...state, name: action.payload}  
        case EMAIL_CHANGE_REGISTER:
            return {...state, email: action.payload}  
        case PASSWORD_CHANGE_REGISTER:
            return {...state, password: action.payload}  
        case CONFIRM_PASSWORD_CHANGE_REGISTER:
            return {...state, confirmPassword: action.payload}  
        case EMPTY_REGISTER_FORM:
            return {
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
    }
}