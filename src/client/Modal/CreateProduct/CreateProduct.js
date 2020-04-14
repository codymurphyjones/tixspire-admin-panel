
import react, {useState} from "react"
import 'antd/dist/antd.css';
import { Tabs, Modal,Radio,List, Avatar,Slider, InputNumber, Checkbox, Select } from 'antd';
import {IoIosAdd, IoIosRemoveCircle } from "react-icons/io";
import ApiRequest, {createProduct, generatePlan,generateStandardPlan, createPlan} from "../../ApiRequest";
import { Input  } from 'antd';
import ParterLookup from "./PartnerLookup"
//import {firestore} from "../../../utils/firebase"
import {firestore} from "tixpire-api"



const MainContent = (props) => {
    const [product_name, setProductName] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [redirect_url, setRedirectUrl] = useState("");
    const [schedule, setSchedule] = useState("Biweekly");
    const [duration, setDuration] = useState(4);
    const [planCount,setPlanCount] = useState(0);
    const [isPartner,setIsPartner] = useState(false);
    const [partner,setPartner] = useState("");
    const [waiveFee,setWaiveFee] = useState(false);
    const [price,setPrice] = useState(900.00);

    const [plans, setPlans] = useState([
    ]);

    const fee = () => {
      return (!waiveFee ? Number.parseFloat(price * .1) : 0.0);
    }

    const finalCost = () => {
      
      return Number.parseFloat(price + fee());
    }

    const deposit = () => {
      return (!waiveFee ? ((price * .33) + fee()) : 0.0); ;
    }

    const extendedCost = () => {
      return (finalCost() - deposit())
    }


    const deletePlan = (index) => {
      let new_plans = plans;
      new_plans.splice(index,1);

      setPlans([...new_plans]);
    }

    const paymentAmount = () => {
      return (extendedCost() / (schedule == "Monthly" ? duration : (schedule == "Weekly" ? duration * 4 : duration * 2)))
    }

    const getDuration = () => {
      return (schedule == "Monthly" ? duration : (schedule == "Weekly" ? duration * 4 : duration * 2));
    }

    const weeklyOrBi = () => {
      return (schedule == "Monthly" ?  "m" : "w")
    }

    const handleOk = () => {
      
      createProduct(product_name,product_description,redirect_url).then(db => {
        
        
        
        if(db.status != "error") {
          let productDB = firestore.collection("products").doc(db.data.id)
          productDB.set({active: true,  count: -1, name: product_name });
          var myplans = plans;
          
          myplans.push({title: product_name + ": Standard Plan",
          description: "A plan to pay the full value off in one lump sum",
          schedule: schedule,
          duration: duration,
          cost: "900.00" });

          function run(val,item) {
            console.log(item);
            let {schedule,duration,numOfCharges,weekly,deposit} = item;
            productDB.collection("plans").doc(val.id).set({ 
              checkout_page: val.checkout_page,
              plan_description: val.plan_description,
              price: val.price,
              partnerId: isPartner ? partner : null,
              schedule: schedule || "",
              duration: duration || "",
              deposit: deposit || ""
            })
          }
          myplans.map((item) => {
            let plan = generatePlan(db.data.id,product_name + " " + item.title, item.cost,item.numOfCharges, item.weekly,item.schedule =="Biweekly" ? 2 : 1, item.deposit, item.description);

            createPlan(plan, (val) => run(val, item));
          })
          
          createPlan(generateStandardPlan(db.data.id, product_name + " Standard Plan",price), (val) => run(val, price));

          if(process.browser) {
              setTimeout(function () {
                window.open('/landing/' + db.data.id, '_blank');
            }, 1700);
          }
          
        }
      });
      props.hide();
    }

    const handleCancel = () => {
      props.hide();
    }
  let listRenders = 0;

	return (
        <Modal
          title="Add Product"
          visible={props.showModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
         
         <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", margin: "15px 0px"}}>
            <div>
                <Input placeholder={"Product"} value={product_name} onChange={(e) => {
                  setProductName(e.target.value);

                }} />
            </div>

            <div>
                <Input placeholder={"URL"} value={redirect_url} onChange={(e) => {
                  setRedirectUrl(e.target.value);
                }}/>
            </div>
          </div>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", margin: "15px 0px"}}>
          <div style={{display: "flex", margin: "0px 20px"}}>
                <p style={{margin: "auto auto" }}>
                <Checkbox onChange={(e)=>{setIsPartner(e.target.checked);} } checked={isPartner} style={{width: 135}}>Partner</Checkbox>
                    </p> 
            </div>

            <div>
                <Input placeholder={"Description"} value={product_description} onChange={(e) => {
                  setProductDescription(e.target.value);

                }} />
            </div>

           
          </div>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", margin: "15px 0px"}}>
           
            <div>
                <ParterLookup
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Partner ID"
                  optionFilterProp="children"
                  disabled={!isPartner} 
                  onChange={(e) => setPartner(e.target.value)}
                  value={partner}
                  filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                } />
            </div>
            <div style={{display: "flex", margin: "0px 20px"}}>
                <p style={{margin: "auto auto"}}>
                    <span style={{fontWeight: "bold"}}>Fee</span> ${fee().toFixed(2)}
                    </p> 
            </div>
          </div>
          
          
          <div style={{border: "1px solid #000", borderRadius: "10px", padding: "5px", marginTop: 10}}>
            <div style={{ flexDirection: "column", width: "95%", justifyContent: "space-around", marginTop: 10, marginBottom: 10, textAlign: "center"}}>
              <div style={{display: "flex", flexDirection: "row", width: "95%", justifyContent: "space-between", marginTop: 10, marginBottom: 10, textAlign: "center"}}>
                <InputNumber
                  min={100}
                  max={3000}
                  style={{ marginLeft: 16, marginTop: 6 }}
                  value={price}
                  onChange={(e) => {setPrice(e)}}
                  step={0.01}
                />
          
                <div style={{display: "flex", flexDirection: "column"}}><span style={{fontWeight: "bold"}}>Payment</span>${  paymentAmount().toFixed(2) }</div>
                <div style={{display: "flex", flexDirection: "column"}}><span style={{fontWeight: "bold"}}>Total Cost</span> ${finalCost().toFixed(2)}</div>
              
              </div>
              <Slider
                disabled={plans.length > 0}
                min={100}
                max={3000}
                onChange={(e) => {setPrice(e)}}
                step={0.01}
                value={typeof price === 'number' ? price : 0}
                style={{width: "100%"}}
              />

          </div>
          <div>
          <div style={{float: 'left', width: "70%"}}>
            <div><Radio.Group value={schedule} onChange={(e) => {setSchedule(e.target.value);}}  style={{marginTop:10, width: "100%"}}defaultValue="a" buttonStyle="solid">
                
                <Radio.Button value="Biweekly">Biweekly</Radio.Button>
                <Radio.Button value="Monthly">Monthly</Radio.Button>
                </Radio.Group>
              </div>

          <div>
              <Radio.Group value={duration} onChange={(e) => {setDuration(e.target.value);}} style={{marginTop:10, width: "100%"}}defaultValue="a" buttonStyle="solid">
              <Radio.Button value={4}>4 Months</Radio.Button>
              <Radio.Button value={6}>6 Months</Radio.Button>

              </Radio.Group>
            </div>
        </div>
        
        <div style={{float: 'right', display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between"}} >
          <Checkbox onChange={(e)=>{setWaiveFee(e.target.checked)} } checked={waiveFee}>Waive Fee</Checkbox></div>
          <div onClick={() => {setPlanCount(planCount + 1); setPlans([...plans,{
              title: 'Plan ' + (planCount + 1),
              description: "A plan ranging across " + duration + " months requiring a payment of $" + paymentAmount().toFixed(2) + " " + schedule +", until $" + finalCost().toFixed(2) + " has been repaid. An initial deposit + payment of $" +  deposit().toFixed(2) + " is required.",
              schedule: schedule,
              duration: duration,
              cost: paymentAmount().toFixed(2),
              numOfCharges: getDuration(),
              weekly: weeklyOrBi(),
              deposit: deposit().toFixed(2),
              finalCost: finalCost()

          }])}}><IoIosAdd size={50}/></div>
        </div>
        <div style={{display: "flex", width: "100%", flexDirection: "column", justifyContent: "space-around", marginTop: 20, marginBottom: 10, textAlign: "center"}}>
          <br />
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", textAlign: "center"}}>
          <div style={{display: "flex", flexDirection: "column"}}><span style={{fontWeight: "bold"}}>Pabbly Set Up Fee:</span> ${deposit().toFixed(2)}</div>
          <div style={{display: "flex", flexDirection: "column"}}><span style={{fontWeight: "bold"}}>Remaining Cost</span> ${extendedCost().toFixed(2)}</div>
          </div>
        </div>
        </div>

          <List
    itemLayout="horizontal"
    dataSource={plans}
    renderItem={(item,index) => {
      listRenders++;
      return (
      <List.Item
          actions={[<a onClick={() => deletePlan(index)} key="list-loadmore-more"><IoIosRemoveCircle size={30} color="red" /></a>]}
      >
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a>Plan {listRenders}</a>}
          description={item.description}
        />
      </List.Item>
    )}}
  />
        </Modal>) ;
}

          
  export default MainContent