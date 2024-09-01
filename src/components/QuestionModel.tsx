import * as React from 'react';
import { useState } from 'react';
import { DatePicker, Form, Input, Modal, Segmented, Select, Space, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import '../styles/questionModel.css';
import { useScreenDetector } from '../hooks/useScreenDetector';
import { RequiredMark } from 'antd/es/form/Form';

const { TextArea } = Input;

interface IQuestion {
    isModalOpen: boolean
    setIsModalOpen: any
}

const QuestionModel = ({ isModalOpen, setIsModalOpen }: IQuestion) => {

    const [form] = Form.useForm();
    const { isMobile, isTablet, isDesktop } = useScreenDetector();

    const handleOk = async () => {
        if (await form.validateFields()) {
            console.log(form.getFieldsValue());
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
            <div className='question-controls'>
                <Form
                    form={form}
                    name="register"
                    scrollToFirstError
                    layout="vertical"
                    colon={false}
                    requiredMark={customizeRequiredMark}
                >
                    <Form.Item
                        label="Question"
                        name="value"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Enter Question Here" />
                    </Form.Item>

                    <Form.Item
                        label="Option A"
                        name="A"
                        layout="vertical"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Enter Option A" autoSize />
                    </Form.Item>

                    <Form.Item
                        label="Option B"
                        name="B"
                        layout="vertical"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Enter Option A" autoSize />
                    </Form.Item>

                    <Form.Item
                        label="Option C"
                        name="C"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Enter Option A" autoSize />
                    </Form.Item>

                    <Form.Item
                        label="Option D"
                        name="D"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Enter Option A" autoSize />
                    </Form.Item>

                    <Form.Item
                        label="Correct Answer"
                        name="answer"
                        layout='horizontal'
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <Segmented options={['A', 'B', 'C', 'D']} />

                    </Form.Item>

                    <Form.Item
                        label="Answer Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Enter Explanation Here" />
                    </Form.Item>

                    <Form.Item
                        label="Event Date Time"
                        name="eventDate"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <DatePicker
                            showTime
                            onChange={(value, dateString) => {
                                console.log('Selected Time: ', value);
                                console.log('Formatted Selected Time: ', dateString);
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Countries Related to the Question"
                        name="countries"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            defaultValue={['lucy']}
                            placeholder="Outlined"
                            style={{ flex: 1 }}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="States Related to the Question"
                        name="states"
                    >
                        <Select
                            mode="multiple"
                            defaultValue={['lucy']}
                            placeholder="Outlined"
                            style={{ flex: 1 }}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Question Categories"
                        name="categories"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            defaultValue={['lucy']}
                            placeholder="Outlined"
                            style={{ flex: 1 }}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Question Sub Categories"
                        name="subcategories"
                    >
                        <Select
                            mode="multiple"
                            defaultValue={['lucy']}
                            placeholder="Outlined"
                            style={{ flex: 1 }}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'yiminghe' },
                            ]}
                        />
                    </Form.Item>

                </Form>
            </div>
        </Modal>
    )
}

export default QuestionModel;