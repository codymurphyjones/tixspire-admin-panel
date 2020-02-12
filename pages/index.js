
import react from "react"
import './style.css'
import TicketComponent from "../components/TicketComponent"
import 'antd/dist/antd.css';
import { Tabs, Icon } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const FullHeightPage = () => (
  <div style={{height: "100%"}}>
	<div style={{width: "200px", maxWidth: "200px", float: 'left',display: "inline-block"}}>
	<Tabs style={{height: "100%"}} defaultActiveKey="1" onChange={callback}>
		<TabPane tab="Req" key="1">
			<TicketComponent />
			<TicketComponent />
			<TicketComponent />
			<TicketComponent />
			<TicketComponent />
			<TicketComponent />
		</TabPane>
		<TabPane tab="Pur" key="2">
			<TicketComponent />
			<TicketComponent />
			<TicketComponent />
			<TicketComponent />
			<TicketComponent />
			<TicketComponent />
		</TabPane>
	</Tabs>
        </div>
		<div className="centered" style={{width: "74%", float: 'right', height: "100%"}}>
		<div style={{display: "block", width: "100%"}}>
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
        		justifyContent: 'space-around',
        		flexDirection: 'row',
       			 width: '100%',
        		textAlign: 'center',
        		alignItems: 'center', marginTop: 50}}>
				<div onClick={() => {console.log("Deny")}}><Icon type="close" style={{fontSize: 30}} ></Icon></div>
				<div onClick={() => {console.log("Accept")}}><Icon type="check" style={{fontSize: 30}}></Icon></div>
			</div>
		</div>
		
		</div>
		</div>
          )
          
  export default FullHeightPage