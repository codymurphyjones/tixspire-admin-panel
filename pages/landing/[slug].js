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
    const [description,setDescription] = useState([]);
    const [plan_description, setPlanDescription] = useState("");
    const [mouseOverIndex, setmouseOverIndex] = useState(0);
    const [title, setTitle] = useState("Title");
    
    useEffect(() => {
    if(slug) {
      let product = firestore.collection("products").doc(slug);
      product.get().then(function(doc) {
          if (doc.exists) {
            let data = doc.data();
              if(data.active) {
                setTitle(data.name);
                console.log("Data")
                console.log(data);
                setDescription(data.description);
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
                        price: docData.price,
                        schedule: docData.schedule,
                        deposit: docData.deposit,
                        duration: docData.deposit
                      }
                      
                      plans.push(planData);
                      

                      
                  });
                }).finally(() =>{
                  let obj = [...plans,...pageData];

                  obj.sort((a, b) => {console.log(b); return b.price - a.price})
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
        window.open(url, '_blank');
  }

  return (
    <ScreenArea backgroundColor="#fff">
      <div style={{margin: '50px 50px'}}>
      <h1>
            {title}
      </h1>
      <div><h3><b>Description:</b> {description}  </h3></div>
      <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
      <div style={{width: pageData.length > 3 ? "100%" : (pageData.length > 3 ? "75%": "50%")}}>
      <PricingTable highlightColor='#1976D2'>
        {pageData.map((item, index) => {
          if(index == 0 && plan_description == "")
                  setPlanDescription(item.plan_description)
            
            return (<PricingSlot highlighted={mouseOverIndex == index ? true : false}  onMouseEnter={()=> {setmouseOverIndex(index); setPlanDescription(item.plan_description)}}
                                 onClick={()=> onClick(item.checkout_page)} 
                                 buttonText='SELECT PLAN' title={(index == 0) ? "Full Payment" : 'PLAN ' + index} priceText={"$" + item.price.toFixed(2) + ((index == 0) ?  "" : "/" + item.schedule)} key={index}>
                      {index == 0 ? <PricingDetail><br /></PricingDetail> : <PricingDetail><b>Deposit:</b> ${item.deposit}</PricingDetail>}
                      {item.count == -1 ? <PricingDetail><br /></PricingDetail> :  <PricingDetail><b>Inventory:</b> {item.count}</PricingDetail>}
                      {item.partnerId ? <PricingDetail><b>PartnerId:</b> {item.partnerId}</PricingDetail> : null}
                </PricingSlot>)
        })}
        </PricingTable>
        </div></div>
        <div><h3>Plan Description: </h3> {plan_description != "" ? plan_description : <br />}</div>
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
