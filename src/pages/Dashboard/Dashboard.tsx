import { ConfigProvider, Tabs } from 'antd';
import type { TabsProps } from 'antd';

import '../../styles/dashboard.css';
import PracticeSessionDashboard from '../Dashboard/Practice/PracticeSessionDashboard';
import LiveSessionDashboard from '../Dashboard/Live/LiveSessionDashboard';
import ContributionDashboard from '../Dashboard/Contribution/ContributionDashboard';

interface IDashboardProps {
}

const Dashboard = ({ }: IDashboardProps) => {

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Practice Session',
            children: <PracticeSessionDashboard />,
        },
        {
            key: '2',
            label: 'Live Session',
            children: <LiveSessionDashboard />,
        },
        {
            key: '3',
            label: 'My Contribution',
            children: <ContributionDashboard />,
        },
    ];


    return (
        <div className="dashboard-div">
            <ConfigProvider
                theme={{
                    components: {
                        Tabs: {
                            itemColor: '#383838',
                            itemSelectedColor: '#016d8b',
                            itemHoverColor: '#016d8b',
                            inkBarColor: '#016d8b',
                            horizontalItemPaddingLG: 's10px 0'
                        }
                    },
                }}>
                <Tabs size='large' className='tabs' defaultActiveKey="1" items={items} onChange={onChange} />

            </ConfigProvider>
        </div>
    )
}

export default Dashboard;