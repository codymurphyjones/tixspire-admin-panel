
import axios from "axios"
let username = "5145db71bf82699f1286";
let password = "b90ee0552245d7a4e5699480f1573ceb";

async function getProducts() {
    console.log("I happen")
  try {
    const response = await axios.get('https://payments.pabbly.com/api/v1/products',{
        auth: {
            username: username,
            password: password
        }
    } );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function testConnection() {
    try {
        const response = await axios.get('https://payments.pabbly.com/api/v1/products/',{
            auth: {
                username: username,
                password: password
            }
        } );
        console.log(response.data);
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
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

async function createPlan(product_id,description,price, redirect_url="https://www.pabbly.com/") {
    try {
      const response = await axios.post('https://payments.pabbly.com/api/v1/plan/create',{
        "product_id": "5d8de292e05efd2ec02232e6",
        "plan_name": "plan1",
        "plan_code": "plan1",
        "billing_cycle": "lifetime",
        "setup_fee": 2,
        "billing_cycle_num": "2",
        "price": 10,
        "billing_period": "m",
        "billing_period_num": "1",
        "plan_active": "true",
        "plan_description": "",
        "trial_period": 2,
        "redirect_url": "https://www.pabbly.com/",
        "currency_code": "USD"
      },{
          auth: {
              username: username,
              password: password
          }
      } );
      console.log(response.data);
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
      console.log(response.data);
    } catch (error) {
        console.log("Error")
      console.error(error);
    }
  }

const ApiRequest = () => {
    console.log("Test")
    //testConnection();
    getPlans("5e58827bc73dc90aa13ad8a1");
    createProduct("Product Test 2","product description","www.exampledomain.com");
}

          
  export default ApiRequest