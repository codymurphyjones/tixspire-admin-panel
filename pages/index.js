
import react, {useState} from "react"
import './style.css'
import TicketComponent from "../components/TicketComponent"
import Applications from "../components/Applications"
import MainContent from "../components/MainContent"
import 'antd/dist/antd.css';
import { Tabs, Icon, Alert } from 'antd';
import {useWindowDimensions} from "../tool/hooks"

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const FullHeightPage = (props) => {
	const { height, width } = useWindowDimensions();
	console.log(width);
	const [selected,setSelected] = useState(false);
	const [selectedId,setSelectedId] = useState(null);

	const setSelectedVals = (id) => {
		if(!id)
			setSelected(false);
		else
			setSelected(true);
		setSelectedId(id || -1);
	}

  return (<div style={{height: "100%"}}>
	  	<Applications PressButton={(id)=>{return () => {setSelected(true); setSelectedId(id); console.log("Test")}}} selected={selected} />
		<MainContent goBack={() => {setSelectedVals()}} selected={selected} />
		</div>
		  )
}
          
  export default FullHeightPage