import { Table, Tag } from "antd";
import type { TableColumnsType } from 'antd';
import { useFetchUsersQuery } from "../../../redux/adminApis";
import { useEffect, useState } from "react";
import { addKeyToData } from "../../../utils/addKeyToData";
import coin from '../../../assets/coin-48.png'

const columns: TableColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name', width: '25%' },
    { title: 'Email', dataIndex: 'email', key: 'email', width: '30%' },
    {
        title: 'Role', dataIndex: 'role', key: 'role', render: (role: string) => {
            return (
                <Tag color={role === 'admin' ? 'green' : 'cyan'} key={role}>
                    {role.toUpperCase()}
                </Tag >
            );
        }
    },
    {
        title: 'Coins', dataIndex: 'coins', key: 'coins', width: '15%', render: (coins) => {
            return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={coin} alt='coin' width={20} height={20} /> {coins}
                </div>
            );
        }
    }
];

interface DataType {
    key: React.Key;
    name: string;
    email: string;
    role: string;
    coins: string;
}

interface IUserDatagridProps {
}

const UserDataGrid = ({ }: IUserDatagridProps) => {

    const { data } = useFetchUsersQuery('');
    const [userData, setUserData] = useState<DataType[]>();

    useEffect(() => {
        if (data?.success) {
            const finalData = addKeyToData(data?.users)
            setUserData(finalData);
        }
    }, [data])

    console.log(data)

    return (
        <div className="contribution-div">
            <Table
                columns={columns}
                dataSource={userData}
            />
        </div>
    );
};


export default UserDataGrid;
