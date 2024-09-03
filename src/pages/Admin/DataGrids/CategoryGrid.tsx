import { Table } from "antd";
import type { TableColumnsType } from 'antd';
import { useCategoriesQuery } from "../../../redux/adminApis";
import { useEffect, useState } from "react";
import { addKeyToData } from "../../../utils/addKeyToData";
import '../../../styles/admin/categoryGrid.css';
import CategoryModel from "../Models/CategoryModel";
import SubCategoryModel from "../Models/SubCategoryModel";

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
    const [isCatModalOpen, setIsCatModalOpen] = useState(false);
    const [isSubCatModalOpen, setIsSubCatModalOpen] = useState(false);


    const getCategoryFilters = () => {
        const filters = data?.categories?.map((cat: any) => {
            return { text: cat?.name, value: cat?.name }
        })
        return filters;
    }

    const catColumns: TableColumnsType<DataType> = [
        { title: 'Category', dataIndex: 'name', key: 'name' },
        // {
        //     title: 'Action',
        //     dataIndex: '',
        //     key: 'x',
        //     render: (data: any) => <button onClick={() => deleteCategory(data)}>Delete</button>,
        // },
    ];

    const subCatColumns: TableColumnsType<SubCatDataType> = [
        {
            title: 'Sub Category', dataIndex: 'name', key: 'name',
        },
        {
            title: 'Category', dataIndex: 'category', key: 'category', render: (category) => {
                return <div>{category?.name}</div>;
            },
            filters: getCategoryFilters(),
            onFilter: (value: any, record: any) => record.category.name === value

        },
    ];


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
                <button className="add-btn" onClick={() => setIsSubCatModalOpen(true)}>Add Sub Category</button>
                <button className="add-btn" onClick={() => setIsCatModalOpen(true)}>Add Category</button>
            </div>
            <CategoryModel isModalOpen={isCatModalOpen} setIsModalOpen={setIsCatModalOpen} />
            <SubCategoryModel categories={catData} isModalOpen={isSubCatModalOpen} setIsModalOpen={setIsSubCatModalOpen} />
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
