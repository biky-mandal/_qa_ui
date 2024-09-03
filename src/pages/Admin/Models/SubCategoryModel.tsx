import * as React from 'react';
import { Form, Input, message, Modal, Select, Tag } from 'antd';
import { useScreenDetector } from '../../../hooks/useScreenDetector';
import { useCreateSubCategoryMutation } from '../../../redux/adminApis';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const { TextArea } = Input;

interface ISubCategoryModel {
    isModalOpen: boolean;
    setIsModalOpen: any;
    categories: any;
}

const SubCategoryModel = ({ isModalOpen, setIsModalOpen, categories }: ISubCategoryModel) => {

    const [form] = Form.useForm();
    const { isMobile, isTablet, isDesktop } = useScreenDetector();
    const [newSubCategory] = useCreateSubCategoryMutation();
    const [categoriesData, setCategoriesData] = useState<any>([]);

    useEffect(() => {
        const tempCategories: any = [];
        categories && categories.map((cat: any) => {
            const obj: any = { value: cat._id, label: cat.name };
            tempCategories.push(obj);
        })

        setCategoriesData(tempCategories);
    }, [categories])

    const handleOk = async () => {
        if (await form.validateFields()) {
            const _subcategory = form.getFieldsValue();

            await newSubCategory(_subcategory).then(({ data }) => {
                if (data?.success) message.success(data?.message) || 'Sub Category Added Successfully';
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
                        label="Sub Category"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Enter Sub Category Here" />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
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
                            options={categoriesData}
                        />
                    </Form.Item>

                </Form>
            </div>
        </Modal>
    )
}

export default SubCategoryModel;