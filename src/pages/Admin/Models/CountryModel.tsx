import * as React from 'react';
import { Form, Input, message, Modal, Tag } from 'antd';
import { useScreenDetector } from '../../../hooks/useScreenDetector';
import { useCreateCountryMutation } from '../../../redux/adminApis';

const { TextArea } = Input;

interface ICountryModel {
    isModalOpen: boolean
    setIsModalOpen: any
}

const CountryModel = ({ isModalOpen, setIsModalOpen }: ICountryModel) => {

    const [form] = Form.useForm();
    const { isMobile, isTablet, isDesktop } = useScreenDetector();

    const [newCountry] = useCreateCountryMutation()

    const handleOk = async () => {
        if (await form.validateFields()) {
            const _country = form.getFieldsValue();
            console.log(_country);
            await newCountry(_country).then(({ data }) => {
                if (data?.success) message.success(data?.message) || 'Country Added Successfully';
                else message.error(data?.message) || 'Failed to Add Country';
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
                        label="Country"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Enter Country Name Here" />
                    </Form.Item>

                    <Form.Item
                        label="Country Code"
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

                </Form>
            </div>
        </Modal>
    )
}

export default CountryModel;