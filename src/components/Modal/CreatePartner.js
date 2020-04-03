
import react, {useState} from "react"
import 'antd/dist/antd.css';
import { Tabs, Modal,Radio,List, Avatar,Slider, InputNumber, Checkbox } from 'antd';
import {axios} from "axios"
import {IoIosAdd } from "react-icons/io";
import ApiRequest, {createProduct, generatePlan, createPlan} from "../ApiRequest";
import { Button, Input, PageHeader  } from 'antd';


const CreatePartner = (props) => {
    const [partnerName, setPartnerName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [contactName, setContactName] = useState("");
    const [primaryContact, setPrimaryContact] = useState("");


    const handleOk = () => {
      props.hide();
    }

    const handleCancel = () => {
      props.hide();
    }

	return (
        <Modal
          title="Add Partner"
          visible={props.showModal}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                <div style={{marginTop: 10}}>
                    <Input value={partnerName} placeholder={"Partner Name"} onChange={e => {
                        setPartnerName(e.target.value.replace(/ /,""));
                    }} />
                </div>

                <div style={{marginTop: 10}}>
                    <Input placeholder={"Company Name"} value={companyName} onChange={e => {
                        setCompanyName(e.target.value);
                    }} />
                </div> 
          </div>

          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                <div style={{marginTop: 10}}>
                    <Input placeholder={"Contact Name"} value={contactName} onChange={e => {
                        setContactName(e.target.value);
                    }} />
                </div> 

                <div style={{marginTop: 10}}>
                    <Input placeholder={"Primary Contact"} value={primaryContact} onChange={e => {
                        setPrimaryContact(e.target.value);
                    }} />
                </div>
          </div>

          
        </Modal>) ;
}

          
  export default CreatePartner