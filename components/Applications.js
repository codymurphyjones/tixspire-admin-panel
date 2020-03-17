
import react from "react"
import TicketComponent from "../components/TicketComponent"
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import {useWindowDimensions} from "../tool/hooks"

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
		<TabPane tab="Req" key="1">
			<TicketComponent onClick={props.PressButton(1)} />
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
        </div>);
}

          
  export default Applications