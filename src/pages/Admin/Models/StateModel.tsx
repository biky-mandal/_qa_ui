import * as React from 'react';
import { Form, Input, message, Modal, Select, Tag } from 'antd';
import { useScreenDetector } from '../../../hooks/useScreenDetector';
import { useCreateCountryMutation, useCreateStateMutation } from '../../../redux/adminApis';
import { useEffect, useState } from 'react';

const { TextArea } = Input;

interface IStateModel {
    isModalOpen: boolean
    setIsModalOpen: any;
    countries: any;
}

const StateModel = ({ isModalOpen, setIsModalOpen, countries }: IStateModel) => {

    const [form] = Form.useForm();
    const { isMobile, isTablet, isDesktop } = useScreenDetector();
    const [countriesData, setCountriesData] = useState<any>([]);
    const [newState] = useCreateStateMutation()

    useEffect(() => {
        const tempCountries: any = [];
        countries && countries.map((count: any) => {
            const obj: any = { value: count._id, label: count.name };
            tempCountries.push(obj);
        })

        setCountriesData(tempCountries);
    }, [countries])

    const handleOk = async () => {
        if (await form.validateFields()) {
            const _state = form.getFieldsValue();
            console.log(_state);
            await newState(_state).then(({ data }) => {
                if (data?.success) message.success(data?.message) || 'State Added Successfully';
                else message.error(data?.message) || 'Failed to Add State';
                setIsModalOpen(false);
                form.resetFields();
            })
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
        <>
            {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
            {label}
        </>
    );

    return (
        <Modal className="q-model" height='auto' title="Question Details" width={isMobile ? '90%' : isTablet ? '60%' : isDesktop ? '40%' : '50%'} open={isModalOpen} okText="Save" onOk={handleOk} onCancel={handleCancel}>
            <div className='category-controls'>
                <Form
                    form={form}
                    name="register"
                    scrollToFirstError
                    layout="vertical"
                    colon={false}
                    requiredMark={customizeRequiredMark}
                >
                    <Form.Item
                        label="State"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Enter State Name Here" />
                    </Form.Item>

                    <Form.Item
                        label="State Code"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <Input placeholder="Enter code Here" />
                    </Form.Item>

                    <Form.Item
                        label="Country"
                        name="country"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Outlined"
                            style={{ flex: 1 }}
                            options={countriesData}
                        />
                    </Form.Item>

                </Form>
            </div>
        </Modal>
    )
}

export default StateModel;