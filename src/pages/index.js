


// Main.js
import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router'



import tixApi from "tixpire-api"
var {auth} = tixApi;
  



const Index = (props) => {

  const [authval,setAuth] = useState(false);
  const router = useRouter();

    useEffect(() => {
      let unsubscribe = auth.onAuthStateChanged(function(userAuth) {
        if(userAuth) {
          console.log("Login Success");
          router.push("/admin");
        }
        else {
          router.push("/login");
        }
      });
      
      return () => {
        unsubscribe();
      }
  }, [])




  return <div></div>
		  
}
          
  export default Index