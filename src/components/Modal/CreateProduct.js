
import react, {useState} from "react"
import 'antd/dist/antd.css';
import { Tabs, Modal,Radio,List, Avatar,Slider, InputNumber, Checkbox, Select } from 'antd';
import {useWindowDimensions} from "../../utils/hooks"
import {axios} from "axios"
import {IoIosAdd, IoIosRemoveCircle } from "react-icons/io";
import ApiRequest, {createProduct, generatePlan, createPlan} from "../ApiRequest";
import { Button, Input, PageHeader  } from 'antd';

const { TabPane } = Tabs;


const MainContent = (props) => {
    const [product_name, setProductName] = useState("");
    const [product_description, setProductDescription] = useState("");
    const [redirect_url, setRedirectUrl] = useState("");
    const [schedule, setSchedule] = useState("Weekly");
    const [duration, setDuration] = useState(4);
    const [planCount,setPlanCount] = useState(0);
    const [isPartner,setIsPartner] = useState(false);
    const [waiveFee,setWaiveFee] = useState(true);
    const [price,setPrice] = useState(900.00);

    const [plans, setPlans] = useState([
    ]);

    const fee = () => {
      return Number.parseFloat(price * .1);
    }

    const finalCost = () => {
      console.log("cost");
      
      return Number.parseFloat(price + fee());
    }

    console.log(finalCost());

    const deposit = () => {
      return (Number.parseFloat(finalCost()) * .43).toFixed(2)
    }

    const extendedCost = () => {
      return (finalCost() - Number.parseFloat(deposit())).toFixed(2)
    }

    


    const deletePlan = (index) => {
      let new_plans = plans;
      new_plans.splice(index,1);
      console.log(new_plans);

      setPlans([...new_plans]);
    }

    const handleOk = () => {

      createProduct(product_name,product_description,redirect_url).then(db => {

        if(db.status == "error") {
          let plan = generatePlan("Plan 1", "100", schedule == "Weekly" ? "w" : "m", schedule == "Biweekly" ? 2 : 1);
          createPlan(plan);
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
                <Input placeholder={"Description"} value={product_name} onChange={(e) => {
                  setProductDescription(e.target.value);

                }} />
            </div>

           
          </div>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", margin: "15px 0px"}}>
           
            <div>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Partner ID"
                  optionFilterProp="children"
                  disabled={!isPartner} 

                  filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                </Select>
            </div>
            <div style={{display: "flex", margin: "0px 20px"}}>
                <p style={{margin: "auto auto"}}>
                    <span style={{fontWeight: "bold"}}>Total Deposit </span> ${deposit()}
                    </p> 
            </div>
          </div>
          
          
          <div style={{border: "1px solid #000", borderRadius: "10px", padding: "5px", marginTop: 10}}>
            <div style={{ flexDirection: "column", width: "95%", justifyContent: "space-around", marginTop: 10, marginBottom: 10, textAlign: "center"}}>
              <div style={{display: "flex", flexDirection: "row", width: "95%", justifyContent: "space-between", marginTop: 10, marginBottom: 10, textAlign: "center"}}>
                <InputNumber
                  min={100}
                  max={3000}
                  style={{ marginLeft: 16 }}
                  value={price}
                  onChange={(e) => {setPrice(e)}}
                  step={0.01}
                />
          
                <span>${ ((price - price * .1) / (schedule == "Monthly" ? duration : (schedule == "Weekly" ? duration * 4 : duration * 2))).toFixed(2)  }</span>
                <span>Fee: ${(price * .1 ).toFixed(2)}</span>
              
              </div>
              <Slider
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
                <Radio.Button value="Weekly">Weekly</Radio.Button>
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
        <div onClick={() => {console.log("Add"); setPlanCount(planCount + 1); setPlans([...plans,{
        title: 'Plan ' + (planCount + 1),
        description: "A plan ranging across " + duration + " months requiring a payment " + schedule +", until $" + price + " has been repaid. An initial deposit of $" +  (price * .43).toFixed(2) + " is required.",
        schedule: schedule,
        duration: duration
      }])}}><IoIosAdd size={50}/></div>
      <Checkbox onChange={(e)=>{setWaiveFee(e.target.checked)} }checked={waiveFee}>Waive Fee</Checkbox></div>
        </div>
        <div style={{display: "flex", width: "100%"}}>
          <br />
          <br />
        </div>
        </div>

          <List
    itemLayout="horizontal"
    dataSource={plans}
    renderItem={(item,index) => {
      console.log(index);
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