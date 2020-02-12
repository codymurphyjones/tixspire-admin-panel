
import react, {useState} from "react"

import Legend from './Legend'

let url = "http://christmas-cody.herokuapp.com/gift.png"
//let url = "https://images.all-free-download.com/images/graphiclarge/beautiful_gift_of_picture_3_170125.jpg"

  const GiftComponent = (props) => {
    const [show,setShow] = useState(false);
    return show ? (<div style={{flex: 1, maxWidth: "300px", flexDirection: 'column', alignItems: 'center', justifyContent: "center"}}>
        {props.children}
        <br />
        <Legend />
        </div>) : (<div><a onClick={() => { setShow(true)}} >
    <img style={{maxWidth: "400px", width: "80%", marginTop: 40}} src={url}></img></a>
    <div style={{textAlign: 'center', marginTop: 20, fontSize: 28}}>Click me to open!</div></div>

  )
  }
  
  export default GiftComponent