import { Table } from "antd";
import type { TableColumnsType } from 'antd';
import { useCountriesQuery } from "../../../redux/adminApis";
import { useEffect, useState } from "react";
import { addKeyToData } from "../../../utils/addKeyToData";
import '../../../styles/admin/categoryGrid.css';
import SubCategoryModel from "../Models/SubCategoryModel";
import CountryModel from "../Models/CountryModel";
import StateModel from "../Models/StateModel";

interface CountryDataType {
    key: React.Key;
    name: string;
    code: string;
}

interface StateDataType {
    key: React.Key;
    name: string;
    code: string;
    country: string;
    countryCode: string;
}

interface ICountryDataGridProps {
}

const CountryDataGrid = ({ }: ICountryDataGridProps) => {

    const { data } = useCountriesQuery('');
    const [countryData, setCountryData] = useState<CountryDataType[]>();
    const [stateData, setStateData] = useState<StateDataType[]>();
    const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
    const [isStateModalOpen, setIsStateModalOpen] = useState(false);


    const getCountryFilters = () => {
        const filters = data?.countries?.map((country: any) => {
            return { text: country?.name, value: country?.name }
        })
        return filters;
    }

    const getCountryCodeFilters = () => {
        const filters = data?.countries?.map((country: any) => {
            return { text: country?.code, value: country?.code }
        })
        return filters;
    }


    const catColumns: TableColumnsType<CountryDataType> = [
        { title: 'Country', dataIndex: 'name', key: 'name' },
        { title: 'Code', dataIndex: 'code', key: 'code' },
    ];

    const subCatColumns: TableColumnsType<StateDataType> = [
        {
            title: 'State', dataIndex: 'name', key: 'name',
        },
        { title: 'Code', dataIndex: 'code', key: 'code' },
        {
            title: 'Country', dataIndex: 'country', key: 'country', render: (country) => {
                return <div>{country?.name}</div>;
            },
            filters: getCountryFilters(),
            onFilter: (value: any, record: any) => record.country.name === value
        },
        {
            title: 'Country Code', dataIndex: 'country', key: 'country', render: (country) => {
                return <div>{country?.code}</div>;
            },
            filters: getCountryCodeFilters(),
            onFilter: (value: any, record: any) => record.country.code === value
        },
    ];


    useEffect(() => {
        if (data?.success) {
            console.log(data);
            const finalCountries = addKeyToData(data?.countries);
            const finalStates = addKeyToData(data?.states);
            setCountryData(finalCountries);
            setStateData(finalStates)
        }
    }, [data])

    return (
        <div className="contribution-div">

            <div className="admin-cat-top-controls">
                <button className="add-btn" onClick={() => setIsStateModalOpen(true)}>Add State</button>
                <button className="add-btn" onClick={() => setIsCountryModalOpen(true)}>Add Country</button>
            </div>

            <CountryModel isModalOpen={isCountryModalOpen} setIsModalOpen={setIsCountryModalOpen} />
            <StateModel countries={countryData} isModalOpen={isStateModalOpen} setIsModalOpen={setIsStateModalOpen} />

            <Table
                columns={catColumns}
                dataSource={countryData}
            />

            <Table
                columns={subCatColumns}
                dataSource={stateData}
            />
        </div>
    );
};


export default CountryDataGrid;
