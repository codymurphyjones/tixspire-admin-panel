
import react, {useState} from "react"
import { GiPowerLightning, GiPowerButton } from 'react-icons/gi'

const style = {
    padding: 15,
    borderRight: '3px solid #000',
    height: '70px',
    flex: 1.3
}

  const EnabledIcon = (props) => {
    return (<div style={style}>{!props.show ? (<GiPowerLightning color="#EA4630" size={50} />) : (<GiPowerButton color="#165b33" size={50} />)} </div>);
  }
  
  export default EnabledIcon