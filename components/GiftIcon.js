
import react, {useState} from "react"

import { GoGift } from 'react-icons/go'


  const GiftIcon = (props) => {

    let style = {
      padding: 15,
      borderLeft: '3px solid #000',
      height: '70px',
      flex: 1.3,
      textAlign: 'center',
      maxWidth: props.alignRight ? "40px" : 'none',
      float: props.alignRight ? "right" : 'none'
  }
    
    return (<div style={style}>{props.icon ? (<props.icon color="#146b3a" size={50} />) : (<props.icon color="#146b3a" size= {50}/>)} </div>);
  }
  
  export default GiftIcon