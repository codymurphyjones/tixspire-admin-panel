
import react from "react"
import TicketComponent from "../components/TicketComponent"
import 'antd/dist/antd.css';
import { Tabs, Icon, Alert } from 'antd';
import {useWindowDimensions} from "../tool/hooks"

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const RequestDetails = (props) => {

	return (
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
				<div onClick={() => {console.log("Deny"); alert("Deny");}}><Icon type="close" style={{fontSize: 30}} ></Icon></div>
				<div onClick={() => {console.log("Accept"); alert("Accept");}}><Icon type="check" style={{fontSize: 30}}></Icon></div>
			</div>
		</div>
		);
}

          
  export default RequestDetails