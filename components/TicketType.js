
import react, {useState} from "react"
import { GiPowerLightning, GiPowerButton } from 'react-icons/gi'

const style = {
    padding: 15,
    fontSize: 18,
    fontFamily: 'inherit'
}

  const TicketType = (props) => {
    return (<div style={style}><div>{props.title ? props.title : "Admit One"}</div><div style={{fontSize: 10, fontFamily: "inherit", maxWidth: "300px", margin: 'auto'}}>{props.children}</div> </div>);
  }
  
  export default TicketType