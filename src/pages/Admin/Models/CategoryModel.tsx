import * as React from 'react';
import { Form, Input, message, Modal, Tag } from 'antd';
import { useScreenDetector } from '../../../hooks/useScreenDetector';
import { useCreateCategoryMutation } from '../../../redux/adminApis';

const { TextArea } = Input;

interface ICategoryModel {
    isModalOpen: boolean
    setIsModalOpen: any
}

const CategoryModel = ({ isModalOpen, setIsModalOpen }: ICategoryModel) => {

    const [form] = Form.useForm();
    const { isMobile, isTablet, isDesktop } = useScreenDetector();

    const [newCategory] = useCreateCategoryMutation()

    const handleOk = async () => {
        if (await form.validateFields()) {
            console.log(form.getFieldsValue());
            const _category = form.getFieldsValue();

            await newCategory(_category).then(({ data }) => {
                console.log(data);
                if (data?.success) message.success(data?.message) || 'Category Added Successfully';
                else message.error(data?.message) || 'Failed to Add Category';
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
                        label="Category"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Enter Category Here" />
                    </Form.Item>

                </Form>
            </div>
        </Modal>
    )
}

export default CategoryModel;