import React, { useState } from "react";
import "./App.css";
import { Input, Button } from "antd";
import {Redirect} from 'react-router-dom'

function ScreenHome() {

  // set redirect url
  const[redirect, setRedirect] = useState()

  // sign up function
  const[signUpName, setSignUpName] = useState()
  const[signUpEmail, setSignUpEmail] = useState()
  const[signUpPassword, setSignUpPassword] = useState()

  var handleSubmitSignUp = async () => {
    var rawResponse = await fetch('/sign-up', {
      method: 'POST',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: 'name=' + signUpName + '&email='+ signUpEmail + '&password=' + signUpPassword
    })
    if (rawResponse) {
      setRedirect('/sources')
    }
  }
  
  // sign-in function
  const[userEmail, setUserEmail] = useState()
  const[userPassword, setUserPassword] = useState()

  var handleSubmitSignIn = async () => {
    var rawResponse = await fetch(`/sign-in/${userEmail}/${userPassword}`)
    var response = await rawResponse.json()
    console.log(response)
    console.log(response.succes)
    console.log(response.alert)
    if (response.succes) {
      setRedirect('/sources')
    }
  }

  return (
    <div className="Login-page">
      <Redirect to={redirect} />
      
      {/* SIGN-IN */}

      <div className="Sign">
        <Input 
        className="Login-input" 
        placeholder="arthur@lacapsule.com" 
        onChange={ (e) => setUserEmail(e.target.value)}
        value={userEmail}
        />
        <Input.Password 
        className="Login-input" 
        placeholder="password" 
        onChange={ (e) => setUserPassword(e.target.value)}
        value={userPassword}
        />
        <Button style={{ width: "80px" }} type="primary" 
        onClick={ () => handleSubmitSignIn() }>
          Sign-in
        </Button>
      </div>

      {/* SIGN-UP */}

      <div className="Sign">
      <Input 
        className="Login-input" 
        placeholder="arthur93" 
        onChange={ (e) => setSignUpName(e.target.value)}
        value={signUpName}
        />
        <Input 
        className="Login-input" 
        placeholder="arthur@lacapsule.com" 
        onChange={ (e) => setSignUpEmail(e.target.value)}
        value={signUpEmail}
        />
        <Input.Password 
        className="Login-input" 
        placeholder="password" 
        onChange={ (e) => setSignUpPassword(e.target.value)}
        value={signUpPassword}
        />
        <Button style={{ width: "80px" }} type="primary" onClick={ () => handleSubmitSignUp()}>
          Sign-in
        </Button>
      </div>
    </div>
  );
}

export default ScreenHome;
