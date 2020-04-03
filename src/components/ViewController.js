
import react from "react"

import 'antd/dist/antd.css';
import { Tabs, Icon, Alert, Rate  } from 'antd';
import {useWindowDimensions} from "../utils/hooks"
import MainDashboard from "./MainDashboard"

const ViewController = (props) => {


	return (
		<div style={{display: "block", width: "100%"}}>
			<MainDashboard />
		</div>
		);
}

          
  export default ViewController