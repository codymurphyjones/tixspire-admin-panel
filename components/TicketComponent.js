
import react, {useState} from "react"
import EnabledIcon from './EnabledIcon'
import GiftIcon from './GiftIcon'
import TicketType from './TicketType'




  const TicketComponent = (props) => {
    const [show,setShow] = useState(false);
    let iconHide = (val) => {
        return val ? (<div></div>) : (<EnabledIcon show={props.show || false} />)
    }
    return (<div style={{margin: 10, padding: 4, border: "1px solid black"}}>
      Cody Jones<br />
      ACL Live Purchase
    </div>);
  }
  
  export default TicketComponent
