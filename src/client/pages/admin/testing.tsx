import useApi from '@/api/hook';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Table,
  Input,
  Button,
  Image,
  TableProps,
  PaginationProps,
  Form,
  Modal,
  FormProps,
  message,
  Space,
  Popconfirm,
  Select,
  InputNumber,
  Collapse,
} from 'antd';
import {
  MinusCircleOutlined,
  PlusOutlined,
  FormOutlined,
} from '@ant-design/icons';
import styles from '@/styles/adminInfo.module.scss';
import dynamic from 'next/dynamic';
import type { AllTesting as Testing } from '@/api/testing';
import UploadImage from '@/components/uploadImage';
import { HTMLToText } from '@/libs/tool';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
type TestingTableList = Array<Testing & { key: number }>;

function Testing() {
  const {
    getTestingAllList,
    addTesting,
    addTestingQuestion,
    removeTestingQuestion,
    updateTesting,
    removeTesting,
  } = useApi(
    'getTestingAllList',
    'addTesting',
    'addTestingQuestion',
    'removeTestingQuestion',
    'updateTesting',
    'removeTesting',
  );
  const [testingList, setTestingList] = useState<TestingTableList>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [testingTotal, setTestingTotal] = useState<number>(0);
  const [curType, setCurType] = useState<number>();
  const [isShowModal, setIsShowModal] = useState(false);
  const [form] = Form.useForm();

  const getTestingList = () => {
    const param: any = { page: curPage, size: 10 };
    if (curType) {
      param.type = curType;
    }
    getTestingAllList(param).then((res) => {
      setTestingList(
        res.data.map((i) => ({
          ...i,
          key: i.id,
        })),
      );
      setTestingTotal(res.count);
    });
  };

  useEffect(() => {
    setCurPage(1);
    getTestingList();
  }, [curType]);

  useEffect(() => {
    getTestingList();
  }, [curPage]);

  const pageChange: PaginationProps['onChange'] = (page) => {
    setCurPage(page);
    document.body.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const closeModal = () => {
    setIsShowModal(false);
  };

  const showAddModal = () => {
    setIsShowModal(true);
    form.resetFields();
  };

  const submit = () => {
    form.validateFields().then(() => {
      const data = form.getFieldsValue(true);

      if (!data.id) {
        const { cover, ...other } = data;
        addTesting({
          ...other,
          cover: cover[0].response.data,
        }).then(() => {
          message.success('????????????');
          closeModal();
          getTestingList();
        });
      } else {
        const { id, questions, removeArr, cover, ...other } = data;
        if (cover[0]?.response?.data) {
          other.cover = cover[0].response.data;
        }
        Promise.all([
          ...questions.map((i: any) => {
            if (i.id) {
              return Promise.resolve();
            } else {
              return addTestingQuestion(id, i);
            }
          }),
          ...(removeArr?.map((i: any) => {
            return removeTestingQuestion(i);
          }) ?? []),
          updateTesting(id, other),
        ]).then(() => {
          message.success('????????????');
          closeModal();
          getTestingList();
        });
      }
    });
  };

  const updateInfo = (record: Testing) => {
    const clone: any = { ...record };
    clone.cover = [
      {
        uid: '-1',
        name: 'default.png',
        status: 'done',
        url: record.cover,
      },
    ];

    form.setFieldsValue(clone);
    setIsShowModal(true);
  };

  const delteInfo = (id: number) => {
    removeTesting(id as any).then(() => {
      message.success('????????????');
      getTestingList();
    });
  };

  const columns: TableProps<Testing>['columns'] = [
    { title: '????????????', key: 'name', dataIndex: 'name' },
    {
      title: '????????????',
      key: 'cover',
      dataIndex: 'cover',
      render: (val) => (
        <Image className={styles['info-cover']} src={val} alt="" />
      ),
    },
    {
      title: '??????',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => updateInfo(record)}>
            ??????
          </Button>
          <Popconfirm
            title="????????????????????????"
            onConfirm={() => delteInfo(record.id)}
            okText="??????"
            cancelText="??????"
          >
            <Button type="primary" danger>
              ??????
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles['info']}>
      <div className={styles['info-header']}>
        <Select
          placeholder="???????????????"
          allowClear
          className={styles['testing-select']}
          onChange={(val) => setCurType(parseInt(val))}
        >
          <Select.Option value="0">??????</Select.Option>
          <Select.Option value="1">??????</Select.Option>
          <Select.Option value="2">??????</Select.Option>
          <Select.Option value="3">??????</Select.Option>
        </Select>
        <Button
          className={styles['info-add-button']}
          type="primary"
          onClick={showAddModal}
        >
          ??????
        </Button>
      </div>

      <Table
        bordered
        className={styles['info-table']}
        columns={columns}
        dataSource={testingList}
        pagination={{
          current: curPage,
          showSizeChanger: false,
          onChange: pageChange,
          pageSize: 10,
          total: testingTotal,
        }}
      />
      <Modal
        width="50%"
        visible={isShowModal}
        okText="??????"
        cancelText="??????"
        onCancel={closeModal}
        onOk={submit}
        title="??????"
        destroyOnClose
      >
        <ModalForm form={form} className={styles['info-form']} />
      </Modal>
    </div>
  );
}

const ModalForm: React.FC<FormProps> = (props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [qeustionForm] = Form.useForm();
  const removeArr = useRef<number[]>([]);

  const closeModal = () => {
    setIsShowModal(false);
  };

  const showAddModal = () => {
    setIsShowModal(true);
    qeustionForm.resetFields();
  };

  const submit = (addFn: any) => {
    qeustionForm.validateFields().then(() => {
      const { img, title, answers } = qeustionForm.getFieldsValue(true);
      addFn({ img, title, answers });
      closeModal();
    });
  };

  const removeQuestion = (name: number) => {
    const curQuestion = props.form?.getFieldValue('questions')[name];

    if (curQuestion?.id) {
      removeArr.current.push(curQuestion.id);
      props.form?.setFieldsValue({
        removeArr: removeArr.current,
      });
    }
  };

  return (
    <Form {...props}>
      <Form.Item
        label="??????"
        name="name"
        rules={[{ required: true, message: '???????????????' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="??????"
        name="type"
        rules={[{ required: true, message: '???????????????' }]}
      >
        <Select
          options={[
            { label: '??????', value: 0 },
            { label: '??????', value: 1 },
            { label: '??????', value: 2 },
            { label: '??????', value: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="??????"
        getValueFromEvent={normFile}
        name="cover"
        valuePropName="fileList"
        rules={[{ required: true, message: '???????????????' }]}
      >
        <UploadImage />
      </Form.Item>
      <Form.Item
        label="??????"
        name="desc"
        initialValue=""
        rules={[
          {
            validator(rule, val) {
              if (!HTMLToText(val)) {
                return Promise.reject('???????????????');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <ReactQuill
          modules={{
            toolbar: toolbarOptions,
          }}
          theme="snow"
          className={styles['form-quill']}
        />
      </Form.Item>
      <Form.List
        name="questions"
        rules={[
          {
            validator: async (_, questions) => {
              if (!questions || questions.length < 1) {
                return Promise.reject(new Error('?????????????????????'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            <Collapse ghost>
              <Collapse.Panel key="1" header="????????????">
                {fields.map((field, index) => {
                  return (
                    <Form.Item
                      label={`?????? ${index + 1}`}
                      required={false}
                      key={field.key}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        name={[field.name, 'title']}
                        noStyle
                      >
                        <Input style={{ width: '80%' }} disabled />
                      </Form.Item>
                      <Space style={{ marginLeft: 10 }}>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            onClick={() => {
                              removeQuestion(field.name);
                              remove(field.name);
                            }}
                          />
                        ) : null}
                      </Space>
                    </Form.Item>
                  );
                })}
                <Button
                  type="dashed"
                  onClick={showAddModal}
                  style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  ??????
                </Button>
              </Collapse.Panel>
            </Collapse>
            <Form.Item>
              <Form.ErrorList errors={errors} />
            </Form.Item>
            <Modal
              okText="??????"
              cancelText="??????"
              title="??????"
              visible={isShowModal}
              onCancel={closeModal}
              destroyOnClose
              onOk={() => submit(add)}
            >
              <QuestionModalForm form={qeustionForm} />
            </Modal>
          </>
        )}
      </Form.List>
      <Form.List
        name="results"
        rules={[
          {
            validator: async (_, results) => {
              if (!results || results.length < 2) {
                return Promise.reject(new Error('?????????????????????'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            <Collapse ghost>
              <Collapse.Panel key="1" header="????????????">
                {fields.map((field, index) => {
                  return (
                    <Form.Item
                      label={`?????? ${index + 1}`}
                      required={false}
                      key={field.key}
                    >
                      <Space>
                        <Form.Item
                          {...field}
                          validateTrigger={['onChange', 'onBlur']}
                          name={[field.name, 'score']}
                          rules={[
                            {
                              validator(rule, val) {
                                if (index === 0 && val !== 0) {
                                  return Promise.reject('????????????????????????0');
                                } else if (index === 0 && val === 0) {
                                  return Promise.resolve();
                                }

                                if (val === null) {
                                  return Promise.reject('???????????????');
                                }
                                const min =
                                  props.form?.getFieldValue('results')[
                                    index - 1
                                  ].score ?? 0;

                                if (min >= val) {
                                  return Promise.reject(
                                    `?????????????????????????????? ${min} ???`,
                                  );
                                } else {
                                  return Promise.resolve();
                                }
                              },
                            },
                          ]}
                        >
                          <InputNumber
                            placeholder="???????????????"
                            style={{ width: 200 }}
                          />
                        </Form.Item>
                        {fields.length > 2 ? (
                          <MinusCircleOutlined
                            style={{ marginLeft: 10, marginBottom: 20 }}
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Space>
                      <Form.Item
                        {...field}
                        validateTrigger={['onChange', 'onBlur']}
                        name={[field.name, 'desc']}
                        noStyle
                        initialValue=""
                        rules={[
                          {
                            validator(rule, val) {
                              if (!HTMLToText(val)) {
                                return Promise.reject('???????????????');
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <ReactQuill />
                      </Form.Item>
                    </Form.Item>
                  );
                })}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{ width: '60%' }}
                  icon={<PlusOutlined />}
                >
                  ????????????
                </Button>
              </Collapse.Panel>
            </Collapse>
            <Form.Item>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item
        label="????????????"
        name="resultStr"
        initialValue=""
        rules={[
          {
            validator(rule, val) {
              if (!HTMLToText(val)) {
                return Promise.reject('?????????????????????');
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <ReactQuill
          modules={{
            toolbar: toolbarOptions,
          }}
          theme="snow"
          className={styles['form-quill']}
        />
      </Form.Item>
    </Form>
  );
};

const QuestionModalForm: React.FC<FormProps> = (props) => {
  return (
    <Form {...props}>
      <Form.Item
        label="??????"
        name="title"
        rules={[{ required: true, message: '???????????????' }]}
      >
        <Input.TextArea maxLength={100} autoSize={false} />
      </Form.Item>
      <Form.Item
        label="??????"
        getValueFromEvent={normFile}
        name="img"
        valuePropName="fileList"
      >
        <UploadImage />
      </Form.Item>
      <Form.List
        name="answers"
        rules={[
          {
            validator: async (_, answers) => {
              if (!answers || answers.length < 1) {
                return Promise.reject(new Error('?????????????????????'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => {
              return (
                <Form.Item
                  label={`?????? ${index + 1}`}
                  required={false}
                  key={field.key}
                >
                  <Space>
                    <Form.Item
                      validateTrigger={['onChange', 'onBlur']}
                      name={[field.name, 'title']}
                      noStyle
                      rules={[{ required: true, message: '???????????????' }]}
                    >
                      <Input placeholder="????????????" style={{ width: '80%' }} />
                    </Form.Item>
                    <Form.Item
                      validateTrigger={['onChange', 'onBlur']}
                      name={[field.name, 'score']}
                      noStyle
                      rules={[{ required: true, message: '???????????????' }]}
                    >
                      <InputNumber placeholder="??????" min={0} />
                    </Form.Item>
                  </Space>
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      style={{ marginLeft: 10 }}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              );
            })}
            <Form.Item>
              <Button
                type="dashed"
                style={{ width: '100%' }}
                icon={<PlusOutlined />}
                onClick={() => add()}
              >
                ????????????
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  [{ list: 'ordered' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ['image'],
];

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export default Testing;
