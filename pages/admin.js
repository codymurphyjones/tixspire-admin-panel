
import react, {useState, useEffect} from "react"
import TicketComponent from "../src/components/TicketComponent"
import Applications from "../src/components/Applications"
import MainContent from "../src/components/MainContent"
import Modal from "../src/components/Modal"
import 'antd/dist/antd.css';
import './style.css'
import { Tabs, Icon, Alert } from 'antd';
import { useRouter } from 'next/router'


import { auth } from "../src/utils/firebase"
  

const AdminPanel = (props) => {
	const [selected,setSelected] = useState(false);
	const [selectedId,setSelectedId] = useState(null);
	const router = useRouter();
	const setSelectedVals = (id) => {
		if(!id)
			setSelected(false);
		else
			setSelected(true);
		setSelectedId(id || -1);
	}

	const [modalVisible, setModal] = useState(false)
    const [modalType, setModalType] = useState("no modal type");

    function showModal(modal) {
      setModalType(modal)
      setModal(true);
	}
	
	useEffect(() => {
		let unsubscribe = auth.onAuthStateChanged(function(userAuth) {
		
		  if(!userAuth) {
			//router.push("/login");
		  }
		});
		
		return () => {
		  unsubscribe();
		}
	}, [])

  return (<div style={{height: "100%"}}>
	  		<Applications showModal={showModal} PressButton={(id)=>{return () => {setSelected(true); setSelectedId(id);}}} selected={selected} />
			<MainContent showModal={showModal}  goBack={() => {setSelectedVals()}} selected={selected} />
			<Modal  modalType={modalType} showModal={modalVisible} setVisible={setModal} />
		</div>
		  )
}
          
  export default AdminPanel