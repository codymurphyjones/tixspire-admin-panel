// Main.js
import React, {useEffect} from 'react';
import { useRouter } from 'next/router'
import ScreenArea from "../client/ScreenArea"
import UserAuthentication from '../client/UserAuthentication';
import { auth } from "../utils/firebase"

const Login = (props) => {

  const router = useRouter();

    useEffect(() => {
      let unsubscribe = auth.onAuthStateChanged(function(userAuth) {
        if(userAuth) {
          router.push("/admin");
        }
      });
      
      return () => {
        unsubscribe();
      }
  }, [])

  return (
    <ScreenArea backgroundColor="#fff">
      <UserAuthentication navigation={props.navigation} />
    </ScreenArea>
  );
};

const style = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%"
  },
  container2: {
    height: 400,
    width: 300,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
};

export default Login;
