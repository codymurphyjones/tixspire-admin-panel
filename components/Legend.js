
import react, {useState} from "react"
import { GiPowerLightning, GiPowerButton } from 'react-icons/gi'

const style = {
    padding: 15,
}

  const EnabledIcon = (props) => {
    return (<div style={style}>
        <GiPowerLightning size={18} /> is the status icon indicating the ticket is charging!<br />
        <GiPowerButton size={18} /> is the status icon indicating the ticket is ready for use!</div>);
  }
  
  export default EnabledIcon