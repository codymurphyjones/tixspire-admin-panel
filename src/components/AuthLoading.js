// Main.js
import React, {useState, useEffect} from 'react';


import { auth, firestore, storage } from 'Utils'


const AuthLoading = (props) => {

  async function getPostDB() {
    let postDB = firestore.collection("posts");
    let postCollection = {};
    let query = await postDB.get()
      .then(snapshot => {
          if (snapshot.empty) {
            
            return;
          }  
          
          
          snapshot.forEach(doc => {
            let data = doc.data();
            postCollection[doc.id] = {
              id: doc.id,
              body: data.body,
              ticker: data.ticker,
              user: data.User
          }
        });
    })
  .catch(err => {
    
  });


  return postCollection;
}

async function getUserData(uid) {
  let userDB = firestore.collection("UserData").doc(uid);
  let query = userDB.get()
    .then(doc => {
        if (!doc.exists) {
          
          return;
        }  
        
        let data = doc.data();
        
        (async () => {
          await storage.ref(data.profile).getDownloadURL().then((url: string) => { 
            
         let obj = {
            name: data.firstname + " " + data.lastname,
            location: data.location,
            bio: data.bio,
            following: data.following,
            followers: data.followers,
            tickers: data.tickers,
            profile: data.profile,
            profileUrl: url,
            uid: uid,
            isLoaded: true
          }
          props.setUser(obj); 
        });
      })();
        
    })
  .catch(err => {
   
  });
}

async function getUser(userDB) {

            //getUserData(userDB.uid);
    }
  

  async function getData(userAuth) {
    
    await getUser(userAuth)
    let postings = await getPostDB();

   
    props.navigation.navigate("Home", { postings }) 
    
  }

  
    useEffect(() => {
      let unsubscribe = auth.onAuthStateChanged(function(userAuth) {
        
          if (userAuth) {
            
              var uid = userAuth.uid;
              var providerData = userAuth.providerData;

              getData(userAuth);
          } else {
              
              props.navigation.navigate("Auth") 
              
          }
      });
      
      return () => {
        unsubscribe();
      }
  }, [])


  
  
  return (
    <div style={{backgroundColor:"#fff"}}>
	    <div style={style.container}>
		    <div style={style.container2}> 
            
      </div>
	    </div>
    
    </div>
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
    height: 50,
    width: 50,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
};

export default AuthLoading;
