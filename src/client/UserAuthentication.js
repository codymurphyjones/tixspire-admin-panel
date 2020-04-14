// Main.js
import React, {useState, useEffect, useRef, forwardRef} from 'react';
import { useRouter } from "next/router"


import {auth} from "tixpire-api"

import { Button, Input, PageHeader  } from 'antd';

var sha256 = require("js-sha256")




const UserAuthentication = (props) => {
  const [error,setError] = useState("");
  const [isLoading,setIsLoading] = useState(false);
  const [canSubmit,setcanSubmit] = useState(true);
  const [view,setView] = useState("default");
  
  //passwords
  const [password,setPassword] = useState("");

  //email
  const [email,setEmail] = useState("");

  const [authval,setAuth] = useState(false);
  const router = useRouter();

  async function loginUser() {
    await auth.signInWithEmailAndPassword(email, sha256(password)).then((user)=>{
      if(user) {
        setIsLoading(false)
      }
        router.push("/admin");
        
    }).catch(function(error) {
      var errorMessage = error.message;
      setError(errorMessage);
      setIsLoading(false);
    });
  }
  
  async function submitButton() {
    setIsLoading(true);
    setError("");
    await loginUser();
  }
  
  useEffect(() => {
      let unsubscribe = auth.onAuthStateChanged(function(userAuth) {
        
        if(userAuth) {
          console.log("Login Success")
          setAuth(true);
        }
        else {
          console.log("Login Failed")
          setAuth(false);
        }
      });
        
      return () => {
        unsubscribe();
      }
    }, []);



  return (() => {	

    
    return (<div style={{display: 'flex', height: "100%",
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: "column",
      marginTop: -50
      }}>
        <PageHeader
        className="site-page-header"
          onBack={() => null}
          title="Tixpire Admin Login"

          backIcon={false}
        />
        <PageHeader
        className="site-page-header"
          onBack={() => null}
          subTitle="Enter Your Login Credentials"

          backIcon={false}
        />
        <div style={{width: 300}}>
                <div  style={style.inputbox}>
                    <Input placeholder={"Email"} onChange={(e) => setEmail(e.target.value)} value={email} type="text" />
                </div>
                <div style={style.inputbox}>
                    <Input.Password placeholder={"Password"} onChange={(e) => setPassword(e.target.value)} onKeyPress={event => { if(event.key === "Enter") { submitButton() }} } value={password} type="text" />
                </div>
        </div>
        <span style={{color: "red"}}>{error}</span>
        <Button style={{marginTop: 40}} onClick={submitButton} disabled={isLoading}  type="submit" >{isLoading ? "Logging In" : "Log In"}</Button>
      </div>);
  })()
};

const style = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
  container2: {
    width: 300,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  inputbox: {
    display: 'flex',
    margin: "10px 10px",
    justifyContent: "space-between"
  }
};

export default UserAuthentication;
