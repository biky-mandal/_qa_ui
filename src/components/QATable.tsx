import { Table, Tag } from "antd";
import type { TableColumnsType } from 'antd';
import '../styles/qatable.css';

const columns: TableColumnsType<DataType> = [
    { title: 'Question', dataIndex: 'value', key: 'value', width: '40%' },
    { title: 'Event', dataIndex: 'eventDate', key: 'eventDate', width: '15%' },
    {
        title: 'Countries', dataIndex: 'countries', key: 'countries', render: (_, { countries }) => (
            <>
                {countries.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Categories', dataIndex: 'categories', key: 'categories', render: (_, { categories }) => (
            <>
                {categories.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
    },
];

interface DataType {
    key: React.Key;
    value: string;
    eventDate: string;
    countries: string[];
    categories: string[];
    ansKey: string;
    description: string;
    options: { key: string; value: string }[];
}

interface IQaTableProps {
}

const QaTable = ({ }: IQaTableProps) => {

    const data: DataType[] = [
        {
            key: 1,
            value: 'Recently, Adani Green Energy Ltd has secured $400 million green loan for its under-construction solar projects in which states?',
            eventDate: '2010/08/17 12:09:36',
            countries: ['India', 'USA'],
            categories: ['Politics'],
            ansKey: 'D',
            description: 'Tamil Nadu accuses Kerala in Supreme Court of obstructing Mullaperiyar dam maintenance while raising safety concerns. Kerala allegedly delays routine maintenance for months to over a year. Tamil Nadu seeks court’s intervention for completing strengthening works on smaller and main dams, requesting permission to cut 15 trees. It criticizes Kerala for not cooperating despite supervisory committee’s authority under Dam Safety Act, 2021. The dam, built in late 1800s, diverts Periyar river to Tamil Nadu.',
            options: [
                { key: 'A', value: 'India' },
                { key: 'B', value: 'China' },
                { key: 'C', value: 'Russia' },
                { key: 'D', value: 'United States' },
            ]
        }
    ];

    return (
        <div className="contribution-div">
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record) => <TableExplanation record={record} />,
                    rowExpandable: (record) => record.value !== 'Not Expandable',
                }}
                dataSource={data}
            />
        </div>
    );
};

interface ITableData {
    record: DataType;
}

const TableExplanation = ({ record }: ITableData) => {
    return (
        <div className="table-data">
            <div className="option-div">
                {
                    record.options.map((op: any) => {
                        return (
                            <div className="option" style={op.key === record.ansKey ? { color: 'green' } : { color: '#000' }}>
                                <span className={op.key === record.ansKey ? "ans-key a-ans" : "ans-key"}>{op.key}</span>
                                <span className="ans-value">{op.value}</span>
                            </div>
                        )
                    })
                }
            </div>


            <div className="description">
                {record.description}
            </div>
        </div>
    )
}

export default QaTable;
