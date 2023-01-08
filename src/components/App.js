import React, {useReducer, useState} from "react";
import "../styles/App.css";
import User from "../models/user";
import signUpFormReducer from "../reducer/signUpFormReducer";
import loginInFormReducer from "../reducer/loginInFormReducer";
import { 
  NAME_CHANGE_REGISTER,
  EMAIL_CHANGE_REGISTER,
  PASSWORD_CHANGE_REGISTER,
  CONFIRM_PASSWORD_CHANGE_REGISTER,
  EMPTY_REGISTER_FORM,
  
  EMAIL_CHANGE_LOGIN,
  PASSWORD_CHANGE_LOGIN,
  EMPTY_LOGIN_FORM
} from "../reducer/action.type"

/* 
  .. 
  .
*/

const App = () => {

  /* useReducer -> file setup -> 
  
    to manage my signup form fields 
  */
const [signUpForm, setSignUpFormDispatcher] = useReducer(signUpFormReducer, {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})
const [logInForm, setLogInFormDispatcher] = useReducer(loginInFormReducer, {
  email: '',
  password: ''
})
const [registeredUsers, setRegisteredUsers] = useState([])
const [loggedInUser, setLoggedInUser] = useState(null)

const handleSignup = () => {
  /* first we handle negations */
  /* then we go with the happy flow  */

  if(signUpForm.name === '' || signUpForm.email === '' || signUpForm.password === '' || signUpForm.confirmPassword === ''){
    alert('PLease fill all the details of the form');
    return;
  }
  if(signUpForm.password !== signUpForm.confirmPassword){
    alert('password and confirm password do not match up');
    return;
  }
  const user = new User(signUpForm.email, signUpForm.password, signUpForm.name);
  setRegisteredUsers([...registeredUsers, user]);
  setSignUpFormDispatcher({type: EMPTY_REGISTER_FORM})

}

const handleLogin = () => {
  if(logInForm.email === '' || logInForm.password === '' ){
    alert('PLease fill all the details of the form');
    return;
  }
  //[{}, {}, {}] -> 
  const isUser = registeredUsers.find((user)=>{
    return (user.email === logInForm.email && user.password === logInForm.password)
  })
  if(!isUser){
    alert('User is not registered');
    return;
  }
  setLoggedInUser(isUser);
  setLogInFormDispatcher({type: EMPTY_LOGIN_FORM})
}
  return (
    <div id="main">
      <table id="all-users">
      <tbody>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
          {registeredUsers.map((user, id)=>{
            return(
              <tr key={id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
              </tr>
            )
          })}
          
        </tbody>
      </table>
        {!loggedInUser ? 
        (
        <div>

          
          <form className="signup-form">
            <label htmlFor="name">Name</label>
            <input type="text" name="signupName" id="signupName" 
              value={signUpForm.name}
              onChange={(e) => setSignUpFormDispatcher({type: NAME_CHANGE_REGISTER, payload: e.target.value })}
            />
            <label htmlFor="email">Email</label>
            <input type="email" name="signupEmail" id="signupEmail" 
              value={signUpForm.email}
              onChange={(e) => setSignUpFormDispatcher({type: EMAIL_CHANGE_REGISTER, payload: e.target.value })}
            />
            <label htmlFor="password">Password</label>
            <input type="password" name="signupPassword" id="signupPassword" 
              value={signUpForm.password}
              onChange={(e) => setSignUpFormDispatcher({type: PASSWORD_CHANGE_REGISTER, payload: e.target.value })}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="signupConfirmPassword"
              id="signupConfirmPassword"
              value={signUpForm.confirmPassword}
              onChange={(e) => setSignUpFormDispatcher({type: CONFIRM_PASSWORD_CHANGE_REGISTER, payload: e.target.value })}
            />
          </form>
          <button id="signup-button" onClick={handleSignup}>Signup</button>
          <form className="login-styles">
            <label htmlFor="loginEmail">Email</label>
            <input id="loginEmail" name="loginEmail" type="email" 
              value={logInForm.email}
              onChange={(e) => setLogInFormDispatcher({type: EMAIL_CHANGE_LOGIN, payload: e.target.value })}
            />
            <label htmlFor="loginPassword">Password</label>
            <input id="loginPassword" name="loginPassword" type="password" 
              value={logInForm.password}
              onChange={(e) => setLogInFormDispatcher({type: PASSWORD_CHANGE_LOGIN, payload: e.target.value })}
            />
          </form>
          <button id="login-button" onClick={handleLogin}>Login</button>
        </div>
      ) :
      (<div>
        <h3 id="username">{loggedInUser.name}</h3>
        <h3 id="email">{loggedInUser.email}</h3>
        <button id="logout-button" onClick={()=> setLoggedInUser(null)}>Logout</button>
      </div>)
      }
    </div>
  );
};

export default App;
