
import react from "react"
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import {useWindowDimensions} from "../utils/hooks"
import TicketComponent from "../components/TicketComponent"

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const Applications = (props) => {
	const { height, width } = useWindowDimensions();
	console.log(width);

	let actualWidth = "200px"
	let currentDisplay = "inline-block";
	console.log(props.selected);
	console.log(width)
	console.log("test")

	if(width < 720) {
		actualWidth = "100%"

		if(props.selected)
			currentDisplay = "none";
	}


	

	return (
	<div style={{width: actualWidth, maxWidth: actualWidth, float: 'left',display:currentDisplay}}>
	<Tabs style={{height: "100%"}} defaultActiveKey="1" onChange={callback}>
		<TabPane tab="Message Queue" key="1">
			<TicketComponent onClick={() => props.showModal("ShowRequest")} />
			<TicketComponent onClick={() => props.showModal("ShowRequest")} />
			<TicketComponent onClick={() => props.showModal("ShowRequest")} />
			<TicketComponent onClick={() => props.showModal("ShowRequest")} />
			<TicketComponent onClick={() => props.showModal("ShowRequest")} />
			<TicketComponent onClick={() => props.showModal("ShowRequest")} />
			<TicketComponent onClick={() => props.showModal("ShowRequest")} />
			<TicketComponent onClick={() => props.showModal("ShowRequest")} />
		</TabPane>
		
	</Tabs>
        </div>);
}

          
  export default Applications