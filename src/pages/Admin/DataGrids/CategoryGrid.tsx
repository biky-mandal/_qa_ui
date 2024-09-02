import { Table, Tag } from "antd";
import type { TableColumnsType } from 'antd';
import { useCategoriesQuery } from "../../../redux/adminApis";
import { useEffect, useState } from "react";
import { addKeyToData } from "../../../utils/addKeyToData";
import '../../../styles/admin/categoryGrid.css';

const catColumns: TableColumnsType<DataType> = [
    { title: 'Category', dataIndex: 'name', key: 'name' },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
    },
];

const subCatColumns: TableColumnsType<SubCatDataType> = [
    {
        title: 'Sub Category', dataIndex: 'name', key: 'name',
        onFilter: (value, record) => record.name.startsWith(value as string),
        filterSearch: true,
    },
    {
        title: 'Category', dataIndex: 'category', key: 'category', render: (category) => {
            return <div>{category.name}</div>;
        },
        onFilter: (value, record) => record.category.startsWith(value as string),
        filterSearch: true,
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
    name: string;
}

interface SubCatDataType {
    key: React.Key;
    name: string;
    category: string;
}

interface ICategoryDatagridProps {
}

const CategoryDataGrid = ({ }: ICategoryDatagridProps) => {

    const { data } = useCategoriesQuery('');
    const [catData, setCatData] = useState<DataType[]>();
    const [subCatData, setSubCatData] = useState<SubCatDataType[]>();

    useEffect(() => {
        if (data?.success) {
            const finalCat = addKeyToData(data?.categories);
            const finalSubCat = addKeyToData(data?.subcategories);
            setCatData(finalCat);
            setSubCatData(finalSubCat)
        }
    }, [data])

    return (
        <div className="contribution-div">

            <div className="admin-cat-top-controls">
                <button className="add-btn">Add Sub Category</button>
                <button className="add-btn">Add Category</button>
            </div>
            <Table
                columns={catColumns}
                dataSource={catData}
            />

            <Table
                columns={subCatColumns}
                dataSource={subCatData}
            />
        </div>
    );
};


export default CategoryDataGrid;
