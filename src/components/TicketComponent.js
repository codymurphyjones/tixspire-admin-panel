
import react, {useState} from "react"
import EnabledIcon from './EnabledIcon'
import { Rate  } from 'antd';




  const TicketComponent = (props) => {
    const [show,setShow] = useState(false);
    let iconHide = (val) => {
        return val ? (<div></div>) : (<EnabledIcon show={props.show || false} />)
    }
    return (<div style={{margin: 10, padding: 4, border: "1px solid black"}} onClick={props.onClick} >
      {props.name || "Cody Jones"}<br />
      {props.event || "ACL Live Purchase"}
      
    <div><Rate value={props.rate || 2} disabled/></div>
    </div>);
  }
  
  export default TicketComponent
