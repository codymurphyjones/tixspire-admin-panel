
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

export const generatePlan = (plan_name, price, billing_period, billing_period_num=1) => ({
  "product_id": "5e76985a5f048819e473d14d",
  "plan_name": plan_name,
  "plan_code": plan_name,
  "plan_description": "This is a plan description",
  "billing_cycle": "specific",
  "billing_cycle_num": "2",
  "price": price,
  "billing_period": billing_period,
  "billing_period_num": billing_period_num,
  "plan_active": "true",
  "currency_code": "USD"
});

export async function createPlan(plan_object) {
    try {
      const response = await axios.post('https://payments.pabbly.com/api/v1/plan/create',plan_object,{
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
      return response.data;
    } catch (error) {
          console.log("Error")
        console.error(error);
        return null;
    }
  }

const ApiRequest = () => {
    console.log("Test")
    getPlans("5e717a1ee6343a398594a6fd");
    //createProduct("Product Test 2","product description","www.exampledomain.com");
    //getProduct("5e717a1ee6343a398594a6fd");
}
          
  export default ApiRequest