
import react, {useState} from "react"
import 'antd/dist/antd.css';
import { Tabs,Radio,List, Avatar,Slider, InputNumber, Checkbox } from 'antd';
import {useWindowDimensions} from "../utils/hooks"
import {axios} from "axios"
import {IoIosAdd, IoIosBackspace, IoIosLogOut, IoMdPersonAdd} from "react-icons/io";
import {createProduct, generatePlan, createPlan} from "./ApiRequest";
import {auth} from "../utils/firebase"
import Modal from "./Modal"
import ViewController from "./ViewController"


const MainContent = ({ showModal, ...props}) => {
    const { height, width } = useWindowDimensions();

	let actualWidth = "70%"
  let show = true;

	if(width < 720) {
		actualWidth = "100%"

		if(!props.selected)
            show = false;
  }
  //<div onClick={() => {showModal("CreatePartner");}}><IoMdPersonAdd size={40} style={{marginTop: 5, marginRight: "5"}}/></div>
	return show ? (
        <>
            <div style={{height: "100%", textAlign: "center", width: actualWidth, float: 'right', marginTop: 10 }}>
                <div style={{height: 40, float: 'right', marginRight: 20, display: "flex" }}>
                    
                    <div onClick={() => {showModal("CreateProduct");}}><IoIosAdd size={50} style={{marginRight: "5" }}/></div>
                    <div onClick={() => {auth.signOut(); console.log("Sign Out")}}><IoIosLogOut size={50} style={{marginRight: "5" }}/></div>
                </div>
          
                <div style={{marginTop: 40, width: actualWidth, height: "90%"}}>
                    <ViewController />
	      	      </div>
          </div>
        </>) : <> </> ;
}

          
  export default MainContent