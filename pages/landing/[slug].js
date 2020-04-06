// Main.js
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import ScreenArea from "../../client/ScreenArea"
/*
import { auth } from "../../utils/firebase"*/
import 'antd/dist/antd.css';
import '../style.css'
import {firestore} from "../../utils/firebase"

const Login = (props) => {

  const router = useRouter();
    const { slug } = router.query
    const [pageData, setpageData] = useState([]);
    //console.log(slug)
    useEffect(() => {
    if(slug) {
      let product = firestore.collection("products").doc(slug);
      product.get().then(function(doc) {
          if (doc.exists) {
            let data = doc.data();
              if(data.active) {
                let plans = [];
                product.collection("plans").get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                      // doc.data() is never undefined for query doc snapshots
                      let docData = doc.data()
                      let planData = {
                        id: doc.id, 
                        checkout_page: docData.checkout_page, 
                        count: data.count, 
                        partnerId: docData.partnerId, 
                        plan_description: docData.plan_description, 
                        price: docData.price
                      }
                      //console.log(planData);
                      //console.log(doc.id, " => ", doc.data());
                      plans.push(planData);
                      console.log(plans);

                      
                  });
                }).finally(() =>{
                  let obj = [...plans,...pageData];
                  console.log(obj)
                  setpageData(obj);
                })
               

                //console.log("Document data:", data);
              }
         } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
        }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
  }
}, [slug]);

  return (
    <ScreenArea backgroundColor="#fff">
      <div style={{margin: '50px 50px'}}>
      <h1>
            {slug}
      </h1>
      <div style={{margin: '10px 10px'}}>
        {pageData.map((item, index) => {
          console.log(index + ": ")
          console.log(item);
            return <div style={{margin: '10px 10px'}} key={index}>
                      <b>Id:</b> {item.id} <br />
                      <b>url:</b> {item.checkout_page} <br />
                      <b>Inventory:</b> {item.count} <br />
                      <b>PartnerId:</b> {item.partnerId} <br />
                      <b>Description:</b> {item.plan_description} <br />
                      <b>Price:</b> {item.price} <br />
                </div>
        })}
      </div>
      </div>
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
