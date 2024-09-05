import { Table, Tag } from "antd";
import type { TableColumnsType } from 'antd';
import '../../../styles/admin/qaGrid.css';
import { useEffect, useState } from "react";
import QuestionModel from "../Models/QuestionModel";
import { useQuestionAnswersQuery } from "../../../redux/adminApis";
import { addKeyToData } from "../../../utils/addKeyToData";

const columns: TableColumnsType<DataType> = [
    { title: 'Question', dataIndex: 'value', key: 'value', width: '40%' },
    { title: 'Event', dataIndex: 'eventDate', key: 'eventDate', width: '15%' },
    {
        title: 'Countries', dataIndex: 'countries', key: 'countries', render: (_, { countries }) => (
            <>
                {countries.map((country: any) => {
                    let color = country?.name.length > 5 ? 'geekblue' : 'green';
                    if (country?.name === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={country?.name}>
                            {country.name.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Categories', dataIndex: 'categories', key: 'categories', render: (_, { categories }) => (
            <>
                {categories.map((cat: any) => {
                    let color = cat?.name.length > 5 ? 'geekblue' : 'green';
                    if (cat?.name === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={cat?.name}>
                            {cat?.name.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    // {
    //     title: 'Action',
    //     dataIndex: '',
    //     key: 'x',
    //     render: () => <a>Delete</a>,
    // },
];

interface DataType {
    key: React.Key;
    value: string;
    eventDate: string;
    countries: string[];
    categories: string[];
    answer: any;
    options: { key: string; value: string }[];
}

interface IQaDataGridProps {
}

const QaDataGrid = ({ }: IQaDataGridProps) => {

    const [isModelOpen, setIsModelOpen] = useState(false);
    const { data: qa } = useQuestionAnswersQuery('')
    const [data, setData] = useState<any>([]); ([]);

    useEffect(() => {
        if (qa?.success) {
            const temp: any = addKeyToData(qa?.questions)
            setData(temp);
        }
    }, [qa])

    return (
        <div className="contribution-div">

            <div className="admin-cat-top-controls">
                <button className="add-btn" onClick={() => setIsModelOpen(true)}>Add Question</button>
            </div>

            <QuestionModel isModalOpen={isModelOpen} setIsModalOpen={setIsModelOpen} />

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
                    record?.options.map((op: any) => {
                        return (
                            <div className="option" style={op.key === record?.answer?.key ? { color: 'green' } : { color: '#000' }}>
                                <span className={op.key === record?.answer?.key ? "ans-key a-ans" : "ans-key"}>{op.key}</span>
                                <span className="ans-value">{op.value}</span>
                            </div>
                        )
                    })
                }
            </div>


            <div className="description">
                {record?.answer?.description}
            </div>
        </div>
    )
}

export default QaDataGrid;
