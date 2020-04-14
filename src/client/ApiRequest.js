
import axios from "axios"
let username = "5145db71bf82699f1286";
let password = "b90ee0552245d7a4e5699480f1573ceb";

async function getProducts() {
    
  try {
    const response = await axios.get('https://payments.pabbly.com/api/v1/products',{
        auth: {
            username: username,
            password: password
        }
    } );
    
  } catch (error) {
    console.error(error);
  }
}

async function getProduct(id) {
    
  try {
    const response = await axios.get('https://payments.pabbly.com/api/v1/products',{
        auth: {
            username: username,
            password: password
        }
    } );
    
  } catch (error) {
    console.error(error);
  }
}

export async function getPartners(callback) {
    
  try {
    
    const response = await axios.get('/api/partners',{
    } );

    console.log(response.data)
    console.log("Made it here");
    callback(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function getPlans(id) {
  try {
    const response = await axios.get('https://payments.pabbly.com/api/v1/plans/' + id,{
        auth: {
            username: username,
            password: password
        }
    } );
      //console.log(response.data)
    
  } catch (error) {
    console.error(error);
  }
}

export const generatePlan = (product_id,plan_name, price,billing_cycle_num, billing_period, billing_period_num=1, setup_fee="300", plan_description="") => ({
  "product_id": product_id,
  "plan_name": plan_name,
  "plan_code": plan_name,
  "billing_cycle": "specific",
  "billing_cycle_num": billing_cycle_num,
  "setup_fee": setup_fee,
  "price": price,
  "billing_period": billing_period,
  "billing_period_num": billing_period_num,
  "plan_active": "true",
  "plan_description": plan_description,
  "currency_code":"USD"
});

export const generateStandardPlan = (product_id,plan_name, price, plan_description="A full lump sum payment to cover the entire cost.") => ({
  "product_id": product_id,
  "plan_name": plan_name,
  "plan_code": plan_name,
  "billing_cycle": "onetime",
  "price": price,
  "plan_active": "true",
  "plan_description": plan_description,
  "currency_code":"USD",
  "billing_period": "",
  "billing_period_num": ""
});

export async function createPlan(plan_object, callback) {
    try {
      const response = await axios.post('https://payments.pabbly.com/api/v1/plan/create',plan_object,{
          auth: {
              username: username,
              password: password
          }
      } );
      

      callback(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  export async function createProduct(product_name,description,redirect_url="https://www.pabbly.com/") {
    try {
      const response = await axios.post('https://payments.pabbly.com/api/v1/product/create',{
        "product_name":product_name,
        "description":description,
        "redirect_url":redirect_url
      },{
          auth: {
              username: username,
              password: password
          }
      } );
      return response.data;
    } catch (error) {
          
        console.error(error);
        return null;
    }
  }

const ApiRequest = () => {
    getPlans("5e8826a265ea741d34307f43");
    //createProduct("Product Test 2","product description","www.exampledomain.com");
    //getProduct("5e717a1ee6343a398594a6fd");
}
          
  export default ApiRequest