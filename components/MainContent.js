
import react, {useState} from "react"
import RequestDetails from "./RequestDetails"
import 'antd/dist/antd.css';
import { Tabs, Modal,Radio,List, Avatar,Slider, InputNumber } from 'antd';
import {useWindowDimensions} from "../tool/hooks"
import {axios} from "axios"
import {IoIosAdd, IoIosBackspace} from "react-icons/io";
import ApiRequest, {createProduct, generatePlan, createPlan} from "./ApiRequest";

ApiRequest();
const { TabPane } = Tabs;






const MainContent = (props) => {
    const { height, width } = useWindowDimensions();
    const [showModal, setModal] = useState(false)
    const [product_name, setProductName] = useState("Product Test 3");
    const [product_description, setProductDescription] = useState("product description 3");
    const [redirect_url, setRedirectUrl] = useState("www.exampledomain.com 3");
    const [schedule, setSchedule] = useState("Weekly");
    const [duration, setDuration] = useState(3);
    const [planCount,setPlanCount] = useState(0);
    const [price,setPrice] = useState(900);

    const [plans, setPlans] = useState([
    ]);

	let actualWidth = "70%"
  let show = true;


    const handleOk = () => {
      console.log(product_name)
      console.log(product_description)
      console.log(redirect_url)

      createProduct(product_name,product_description,redirect_url).then(db => {
        console.log("Yoooo")
        console.log(db);
        if(db.status == "error") {
          let plan = generatePlan("Plan 1", "100", schedule == "Weekly" ? "w" : "m", schedule == "Biweekly" ? 2 : 1);
          createPlan(plan);
        }
      });
      setModal(false);
    }

	if(width < 720) {
		actualWidth = "100%"

		if(!props.selected)
            show = false;
  }
  let listRenders = 0;

	return show ? (
        <>
        <div style={{width: "100%", height: 40, textAlign: "center", width: actualWidth, float: 'right', marginTop: 10 }}>
            <div style={{height: 40, float: 'left', marginLeft: 20 }}>
                    <div style={{display: props.selected ? "flex" : "none"}} onClick={() => {console.log("Back"); props.goBack()}}><IoIosBackspace size={50}/></div>
            </div>
            <div style={{height: 40, float: 'right', marginRight: 20 }}>
            <div onClick={() => {setModal(true)}}><IoIosAdd size={50}/></div>
            </div>
            
        </div>
        <div className="centered" style={{width: actualWidth, float: 'right', height: "90%"}}>
            
		<RequestDetails />
        <Modal
          title="Add Product"
          visible={showModal}
          onOk={handleOk}
          onCancel={handleOk}
        >
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
          <div><p>Product</p><input value={product_name} onChange={(e) => {
            setProductName(e.target.value);

          }} /></div>

<div><p>URL</p>
          <input value={redirect_url} onChange={(e) => {
            setRedirectUrl(e.target.value);

          }}/></div>
          </div>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
          <div><p>Description</p><input value={product_description} onChange={(e) => {
            setProductDescription(e.target.value);
           

          }}/> </div>
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
          <span>${10000}</span>
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
              <Radio.Button value={3}>3 Months</Radio.Button>
              <Radio.Button value={6}>6 Months</Radio.Button>
              <Radio.Button value={12}>12 Months</Radio.Button>
              </Radio.Group>
            </div>
        </div>

        <div style={{float: 'right'}} onClick={() => {console.log("Add"); setPlanCount(planCount + 1); setPlans([...plans,{
        title: 'Plan ' + (planCount + 1),
        description: "A plan ranging across " + duration + " requiring a payment " + schedule +", until $" + price + " has been repaid",
        schedule: schedule,
        duration: duration
      }])}}><IoIosAdd size={50}/></div>
        </div>
        <div style={{display: "flex", width: "100%"}}>
          <br />
          <br />
        </div>
        </div>

          <List
    itemLayout="horizontal"
    dataSource={plans}
    renderItem={item => {
      listRenders++;
      return (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
          title={<a href="https://ant.design">Plan {listRenders}</a>}
          description={item.description}
        />
      </List.Item>
    )}}
  />
        </Modal>
		
		</div></>) : <> </> ;
}

          
  export default MainContent