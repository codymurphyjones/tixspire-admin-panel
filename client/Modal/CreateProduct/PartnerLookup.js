
import { Select } from 'antd';
import { getPartners } from "../../ApiRequest"
import {useEffect, useState} from "react"


const MainContent = (props) => {
    const [partners,setPartners] = useState([]);
            useEffect(() => {
              getPartners(setPartners);

            },[])

               return ( <Select
                  { ...props}
                >
                      {partners.map(item => <Option value={item.id}>{item.name}</Option>)}
                </Select>) ;
}

          
  export default MainContent