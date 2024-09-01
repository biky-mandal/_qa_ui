import { ConfigProvider, Tabs } from 'antd';
import type { TabsProps } from 'antd';

import '../../styles/dashboard.css';

interface IDashboardProps {
}

const AdminDashboard = ({ }: IDashboardProps) => {

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Users',
            children: <div></div>,
        },
        {
            key: '2',
            label: 'Active Q&A',
            children: <div></div>,
        },
        {
            key: '3',
            label: 'Pending Q&A',
            children: <div></div>,
        },
        {
            key: '4',
            label: 'Categories',
            children: <div></div>,
        },
        {
            key: '5',
            label: 'Countries',
            children: <div></div>,
        },
        {
            key: '6',
            label: 'Sessions',
            children: <div></div>,
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

export default AdminDashboard;