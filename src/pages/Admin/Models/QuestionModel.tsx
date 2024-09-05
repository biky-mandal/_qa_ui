import * as React from 'react';
import { DatePicker, Form, Input, message, Modal, Segmented, Select, Tag } from 'antd';
import '../../../styles/admin/questionModel.css';
import { useScreenDetector } from '../../../hooks/useScreenDetector';
import { useCategoriesQuery, useCountriesQuery, useCreateQuestionAnswerMutation } from "../../../redux/adminApis";
import { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useCreateQAByUserMutation } from '../../../redux/api';


const { TextArea } = Input;

interface IQuestion {
    isModalOpen: boolean
    setIsModalOpen: any
}

const QuestionModel = ({ isModalOpen, setIsModalOpen }: IQuestion) => {

    const { user } = useSelector((state: any) => state.auth);
    const [form] = Form.useForm();
    const { isMobile, isTablet, isDesktop } = useScreenDetector();
    const { data: categoryData } = useCategoriesQuery('');
    const { data: countryData } = useCountriesQuery('');
    const [createQuestionByAdmin] = useCreateQuestionAnswerMutation();
    const [createQuestionByUser] = useCreateQAByUserMutation();

    const [countries, setCountries] = useState<any>([]);
    const [selectedCountry, setSelectedCountry] = useState<any>([]);
    const [categories, setCategories] = useState<any>([]);
    const [selectedCategory, setSelectedCategory] = useState<any>([]);
    const [states, setStates] = useState<any>([]);
    const [subCategories, setSubCategories] = useState<any>([]);

    const returnDropDownArray = (data: any) => {
        const tempArray: any = [];
        data.map((d: any) => {
            const obj: any = {
                value: d?._id,
                label: d?.name
            }
            tempArray.push(obj);
        })
        return tempArray;
    }

    useEffect(() => {
        if (categoryData) {
            const tempCate: any = returnDropDownArray(categoryData?.categories);
            setCategories(tempCate);
        }
    }, [categoryData])

    useEffect(() => {
        if (countryData) {
            const tempCountries: any = returnDropDownArray(countryData?.countries);
            setCountries(tempCountries);
        }
    }, [countryData])

    useEffect(() => {
        if (selectedCountry) {
            const tempStates: any = [];
            countryData?.states.map((s: any) => {
                if (selectedCountry.includes(s.country._id)) {
                    const obj: any = {
                        value: s?._id,
                        label: s?.name
                    }
                    tempStates.push(obj);
                }

            })
            setStates(tempStates);
        } else {
            setStates([]);
        }
    }, [selectedCountry])

    useEffect(() => {
        if (selectedCategory) {
            const tempSubCategories: any = [];
            categoryData?.subcategories.map((sc: any) => {
                if (selectedCategory.includes(sc.category._id)) {
                    const obj: any = {
                        value: sc?._id,
                        label: sc?.name
                    }
                    tempSubCategories.push(obj);
                }
            })
            setSubCategories(tempSubCategories);
        } else {
            setSubCategories([]);
        }
    }, [selectedCategory])

    const handleOk = async () => {
        if (await form.validateFields()) {
            const _q: any = {
                value: form.getFieldValue('value'),
                options: [
                    { key: 'A', value: form.getFieldValue('A') },
                    { key: 'B', value: form.getFieldValue('B') },
                    { key: 'C', value: form.getFieldValue('C') },
                    { key: 'D', value: form.getFieldValue('D') },
                ],
                eventDate: moment(form.getFieldValue('eventDate')).utc(true).format(),
                countries: form.getFieldValue('countries'),
                states: form.getFieldValue('states'),
                categories: form.getFieldValue('categories'),
                subCategories: form.getFieldValue('subcategories'),
                createdBy: user._id,
                updatedBy: user._id,
                key: form.getFieldValue('answer'),
                description: form.getFieldValue('description'),
            }

            if (user.role === 'admin') {
                await createQuestionByAdmin(_q).then(({ data }) => {
                    data.success ? message.success(data.message) : message.error(data.message);
                    setIsModalOpen(false);
                    form.resetFields();
                })
            } else {
                await createQuestionByUser(_q).then(({ data }) => {
                    data.success ? message.success(data.message) : message.error(data.message);
                    setIsModalOpen(false);
                    form.resetFields();
                })
            }

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
                        <Segmented defaultValue='A' options={['A', 'B', 'C', 'D']} />

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
                            placeholder="Outlined"
                            style={{ flex: 1 }}
                            options={countries}
                            onChange={(e) => setSelectedCountry(e)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="States Related to the Question"
                        name="states"
                    >
                        <Select
                            mode="multiple"
                            placeholder="Outlined"
                            style={{ flex: 1 }}
                            options={states}
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
                            placeholder="Outlined"
                            style={{ flex: 1 }}
                            options={categories}
                            onChange={(e) => setSelectedCategory(e)}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Question Sub Categories"
                        name="subcategories"
                        rules={[
                            {
                                required: true,
                                message: 'Required!',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            placeholder="Outlined"
                            style={{ flex: 1 }}
                            options={subCategories}
                        />
                    </Form.Item>

                </Form>
            </div>
        </Modal>
    )
}

export default QuestionModel;