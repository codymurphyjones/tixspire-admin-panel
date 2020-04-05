
import react, {useState} from "react"
import 'antd/dist/antd.css';
import { Tabs, Modal,Icon, Rate } from 'antd';
import {axios} from "axios"
import {IoIosAdd } from "react-icons/io";
import ApiRequest, {createProduct, generatePlan, createPlan} from "../ApiRequest";
import { Button, Input, PageHeader  } from 'antd';


const RequestDetails = (props) => {


    const handleOk = () => {
        props.hide();
      }
  
      const handleCancel = () => {
        props.hide();
    }

	return (
        <Modal
          title="Request Details"
          visible={props.showModal}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <div style={{display: 'flex',
        	alignItems: 'center',
        	justifyContent: 'center',
        	flexDirection: 'row',
        	width: '100%',
        	textAlign: 'center',
        	alignItems: 'center'}}>
				
				First Name Last Name<br />
				Email<br />
				Phone Number:<br />
				Birthdate<br />
				Event Name<br />
				URL Where Tickers are purchased:<br />
				Seat Number/Type<br />
				Date of event<br />
				Number of Tickets: 1<br />
				Total Cost: 1192.29<br />
				Additional Notes:<br />
			</div>
            <div style={{display: 'flex',
        	    alignItems: 'center',
        	    justifyContent: 'center',
        	    flexDirection: 'row',
        	    width: '100%',
                textAlign: 'center',
                marginTop: 20}}><Rate value={3} disabled/>
                </div>
			<div style={{display: 'flex',
        		alignItems: 'center',
        		justifyContent: 'space-around',
        		flexDirection: 'row',
       			 width: '100%',
        		textAlign: 'center',
        		alignItems: 'center', marginTop: 10}}>
				<div onClick={() => {console.log("Deny"); handleCancel();}}><Icon type="close" style={{fontSize: 30}} ></Icon></div>
				<div onClick={() => {console.log("Accept"); handleOk();}}><Icon type="check" style={{fontSize: 30}}></Icon></div>
			</div>

          
        </Modal>) ;
}

          
  export default RequestDetails