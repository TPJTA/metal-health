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
          message.success('添加成功');
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
          message.success('修改成功');
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
      message.success('删除成功');
      getTestingList();
    });
  };

  const columns: TableProps<Testing>['columns'] = [
    { title: '测评名称', key: 'name', dataIndex: 'name' },
    {
      title: '测评图片',
      key: 'cover',
      dataIndex: 'cover',
      render: (val) => (
        <Image className={styles['info-cover']} src={val} alt="" />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button type="primary" onClick={() => updateInfo(record)}>
            修改
          </Button>
          <Popconfirm
            title="你确定要删除吗？"
            onConfirm={() => delteInfo(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger>
              删除
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
          placeholder="请筛选类型"
          allowClear
          className={styles['testing-select']}
          onChange={(val) => setCurType(parseInt(val))}
        >
          <Select.Option value="0">健康</Select.Option>
          <Select.Option value="1">性格</Select.Option>
          <Select.Option value="2">社交</Select.Option>
          <Select.Option value="3">能力</Select.Option>
        </Select>
        <Button
          className={styles['info-add-button']}
          type="primary"
          onClick={showAddModal}
        >
          添加
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
        okText="确定"
        cancelText="取消"
        onCancel={closeModal}
        onOk={submit}
        title="添加"
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
        label="标题"
        name="name"
        rules={[{ required: true, message: '请填写标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="类型"
        name="type"
        rules={[{ required: true, message: '请选择类型' }]}
      >
        <Select
          options={[
            { label: '健康', value: 0 },
            { label: '性格', value: 1 },
            { label: '社交', value: 2 },
            { label: '能力', value: 3 },
          ]}
        />
      </Form.Item>
      <Form.Item
        label="封面"
        getValueFromEvent={normFile}
        name="cover"
        valuePropName="fileList"
        rules={[{ required: true, message: '请上传封面' }]}
      >
        <UploadImage />
      </Form.Item>
      <Form.Item
        label="描述"
        name="desc"
        initialValue=""
        rules={[
          {
            validator(rule, val) {
              if (!HTMLToText(val)) {
                return Promise.reject('请输入描述');
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
                return Promise.reject(new Error('至少有一个问题'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            <Collapse ghost>
              <Collapse.Panel key="1" header="问题列表">
                {fields.map((field, index) => {
                  return (
                    <Form.Item
                      label={`问题 ${index + 1}`}
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
                  添加
                </Button>
              </Collapse.Panel>
            </Collapse>
            <Form.Item>
              <Form.ErrorList errors={errors} />
            </Form.Item>
            <Modal
              okText="确定"
              cancelText="取消"
              title="问题"
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
                return Promise.reject(new Error('至少有两个结果'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            <Collapse ghost>
              <Collapse.Panel key="1" header="结果列表">
                {fields.map((field, index) => {
                  return (
                    <Form.Item
                      label={`结果 ${index + 1}`}
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
                                  return Promise.reject('第一个结果必须为0');
                                } else if (index === 0 && val === 0) {
                                  return Promise.resolve();
                                }

                                if (val === null) {
                                  return Promise.reject('请填写分数');
                                }
                                const min =
                                  props.form?.getFieldValue('results')[
                                    index - 1
                                  ].score ?? 0;

                                if (min >= val) {
                                  return Promise.reject(
                                    `需要比上一个结果分数 ${min} 大`,
                                  );
                                } else {
                                  return Promise.resolve();
                                }
                              },
                            },
                          ]}
                        >
                          <InputNumber
                            placeholder="大于该分数"
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
                                return Promise.reject('请输入问题');
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
                  添加结果
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
        label="结果描述"
        name="resultStr"
        initialValue=""
        rules={[
          {
            validator(rule, val) {
              if (!HTMLToText(val)) {
                return Promise.reject('请输入结果描述');
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
        label="题目"
        name="title"
        rules={[{ required: true, message: '请输入题目' }]}
      >
        <Input.TextArea maxLength={100} autoSize={false} />
      </Form.Item>
      <Form.Item
        label="图片"
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
                return Promise.reject(new Error('至少有一个选项'));
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
                  label={`选项 ${index + 1}`}
                  required={false}
                  key={field.key}
                >
                  <Space>
                    <Form.Item
                      validateTrigger={['onChange', 'onBlur']}
                      name={[field.name, 'title']}
                      noStyle
                      rules={[{ required: true, message: '请输入选项' }]}
                    >
                      <Input placeholder="选项名字" style={{ width: '80%' }} />
                    </Form.Item>
                    <Form.Item
                      validateTrigger={['onChange', 'onBlur']}
                      name={[field.name, 'score']}
                      noStyle
                      rules={[{ required: true, message: '请输入分数' }]}
                    >
                      <InputNumber placeholder="分数" min={0} />
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
                添加选项
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
