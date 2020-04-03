
import react from "react"

import 'antd/dist/antd.css';
import { Statistic, Card } from 'antd';
import { LikeOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const MainDashboard = (props) => {

	return (
		<div style={{display: "flex"}}>
				
				
				<div style={{display: "block", flexGrow: 2}}>
				<Card><Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} /> </Card>
				<Card><Statistic title="Unmerged" value={93} suffix="/ 100" /></Card>
				<Card><Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} /> </Card>
				<Card><Statistic title="Unmerged" value={93} suffix="/ 100" /></Card>
				</div>
				<div style={{display: "block", flexGrow: 2}}><Card><Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} /> </Card>
				<Card><Statistic title="Unmerged" value={93} suffix="/ 100" /></Card></div>


				<div style={{display: "block", flexGrow: 2}}><Card>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
       		 </Card>

		<Card>
          <Statistic
            title="Active"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card></div>
		</div>
		);
}

          
  export default MainDashboard