
import react, {useState} from "react"
import CreateProduct from "./CreateProduct"
//import CreatePartner from "./CreatePartner"
import RequestDetails from "./RequestDetails"


const MainContent = ({modalType , ...props}) => {
        
        let ModalComponent = null;

        var hide = () => props.setVisible(false);

        switch(modalType) {
                case "CreateProduct":
                        ModalComponent = CreateProduct;
                break;
                
                case "CreatePartner":
                        //ModalComponent = CreatePartner;
                break;

                case "ShowRequest":
                        ModalComponent = RequestDetails;
                break;

                default:
                        
                break;
        }

	return (
                ModalComponent ? <ModalComponent hide={hide} {...props} /> : <></>) ;
}

          
  export default MainContent