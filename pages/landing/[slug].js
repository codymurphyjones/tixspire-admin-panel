// Main.js
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import ScreenArea from "../../client/ScreenArea"
import {PricingTable, PricingSlot, PricingDetail} from 'react-pricing-table';
import ReactTooltip from 'react-tooltip'
/*
import { auth } from "../../utils/firebase"*/
import 'antd/dist/antd.css';
import '../style.css'
import {firestore} from "../../utils/firebase"

const Login = (props) => {

  const router = useRouter();
    const { slug } = router.query
    const [pageData, setpageData] = useState([]);
    const [plan_description, setPlanDescription] = useState("");
    const [mouseOverIndex, setmouseOverIndex] = useState(-1);
    const [title, setTitle] = useState("Title");
    
    useEffect(() => {
    if(slug) {
      let product = firestore.collection("products").doc(slug);
      product.get().then(function(doc) {
          if (doc.exists) {
            let data = doc.data();
              if(data.active) {
                setTitle(data.name);
                let plans = [];
                product.collection("plans").get().then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                      
                      let docData = doc.data()
                      let planData = {
                        id: doc.id, 
                        checkout_page: docData.checkout_page, 
                        count: data.count, 
                        partnerId: docData.partnerId, 
                        plan_description: docData.plan_description, 
                        price: docData.price
                      }
                      
                      plans.push(planData);
                      

                      
                  });
                }).finally(() =>{
                  let obj = [...plans,...pageData];
                  
                  setpageData(obj);
                })
               

                
              }
         } else {
              
              console.log("No such document!");
        }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
  }
}, [slug]);

  const onClick = (url) => {
      
      if(process.browser)
         window.href = "http://google.com"
  }

  return (
    <ScreenArea backgroundColor="#fff">
      <div style={{margin: '50px 50px'}}>
      <h1>
            {title}
      </h1>
  <div><h3>Plan Description: </h3> {plan_description != "" ? plan_description : <br />}</div>
      <PricingTable highlightColor='#1976D2'>
        {pageData.map((item, index) => {
         
            return (<PricingSlot highlighted={mouseOverIndex == index ? true : false}  onMouseEnter={()=> setmouseOverIndex(index)}
                                 onClick={()=> console.log("click")} 
                                 onMouseLeave={()=> setmouseOverIndex(-1)}
                                 onMouseOver={()=> setPlanDescription(item.plan_description)}
                                 buttonText='SELECT PLAN' title='ENTERPRISE' priceText={"$" + (item.price / 10).toFixed(2) + "/month"} key={index}>
                      <PricingDetail><b>Price:</b> ${item.price}</PricingDetail>
                      <PricingDetail><b>Id:</b> {item.id} </PricingDetail>
                      <PricingDetail><b>Inventory:</b> {item.count}</PricingDetail>
                      {item.partnerId ? <PricingDetail><b>PartnerId:</b> {item.partnerId}</PricingDetail> : null}
                </PricingSlot>)
        })}
        </PricingTable>
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
