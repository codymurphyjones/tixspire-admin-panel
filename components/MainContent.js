
import react from "react"
import RequestDetails from "./RequestDetails"
import 'antd/dist/antd.css';
import { Tabs, Icon, Alert } from 'antd';
import {useWindowDimensions} from "../tool/hooks"

import {IoIosAdd, IoIosBackspace} from "react-icons/io";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const MainContent = (props) => {
    const { height, width } = useWindowDimensions();
	console.log(width);

	let actualWidth = "70%"
	let show = true;
	console.log(props.selected);


	if(width < 720) {
		actualWidth = "100%"

		if(!props.selected)
            show = false;
	}

	return show ? (
        <>
        <div style={{width: "100%", height: 40, textAlign: "center", width: actualWidth, float: 'right', marginTop: 10 }}>
            <div style={{height: 40, float: 'left', marginLeft: 20 }}>
                    <div onClick={() => {console.log("Back"); alert("Back");}}><IoIosBackspace size={50}/></div>
            </div>
            <div style={{height: 40, float: 'right', marginRight: 20 }}>
            <div onClick={() => {console.log("Back"); alert("Back");}}><IoIosAdd size={50}/></div>
            </div>
            
        </div>
        <div className="centered" style={{width: actualWidth, float: 'right', height: "100%"}}>
            
		<RequestDetails />
		
		</div></>) : <> </> ;
}

          
  export default MainContent