import React, { useEffect, useState } from 'react';
import useApi from '@/api/hook';
import styles from '@/styles/question.module.scss';
import {
  Table,
  TableProps,
  Button,
  Form,
  Modal,
  FormProps,
  Switch,
  SwitchProps,
} from 'antd';
import dynamic from 'next/dynamic';
import type { Email } from '@/api/inbox';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
function Question() {
  const { getEmailList, sentEmail } = useApi('getEmailList', 'sentEmail');
  const [questionData, setQuestionData] = useState<(Email & { key: number })[]>(
    [],
  );
  const [curPage, setCurPage] = useState<number>(1);
  const [questionTotal, setQuestionTotal] = useState<number>(1);
  const [isAns, setIsAns] = useState<'0' | '1'>('0');
  const [isShowModal, setIsShowModal] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setQuestionData([]);
    setCurPage(1);
  }, [isAns]);

  useEffect(() => {
    if (
      questionData.length < questionTotal &&
      questionData.length < curPage * 10
    ) {
      getEmailList(isAns, curPage).then((res) => {
        setQuestionTotal(res.count);
        setQuestionData(res.data.map((i) => ({ ...i, key: i.id })));
      });
    }
  }, [getEmailList, isAns, curPage, questionData, questionTotal]);

  const showModalForm = (record: Email, index: number) => {
    form.setFieldsValue({ ...record, index });
    setIsShowModal(true);
  };

  const columns: TableProps<Email>['columns'] = [
    { title: '邮箱', key: 'title', dataIndex: 'email' },
    // { title: '内容', key: 'content', dataIndex: 'content' },
    {
      title: '操作',
      key: 'action',
      render: (text, record, index) => (
        <Button type="primary" onClick={() => showModalForm(record, index)}>
          回复
        </Button>
      ),
    },
  ];

  const closeModal = () => {
    setIsShowModal(false);
    form.resetFields();
  };

  const submit = () => {
    form.validateFields().then(() => {
      const data = form.getFieldsValue(true);
      sentEmail(data.id, data.ans).then(() => {
        if (isAns === '0') {
          questionData.splice(data.index, 1);
          setQuestionData([...questionData]);
        }
        closeModal();
      });
    });
  };

  const changeAns: SwitchProps['onChange'] = (check) => {
    if (check) {
      setIsAns('0');
    } else {
      setIsAns('1');
    }
  };

  return (
    <div className={styles['question']}>
      <Switch
        checkedChildren="未回复"
        unCheckedChildren="已回复"
        defaultChecked
        onChange={changeAns}
      />
      <Table
        dataSource={questionData}
        columns={columns}
        pagination={false}
        expandable={{
          expandedRowRender: (record) => (
            <div dangerouslySetInnerHTML={{ __html: record.content }} />
          ),
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
        <ModalForm form={form} className={styles['question-form']} />
      </Modal>
    </div>
  );
}

const ModalForm: React.FC<FormProps> = (props) => {
  return (
    <Form {...props}>
      <Form.Item
        label="回复"
        name="ans"
        rules={[{ required: true, message: '请填写回复' }]}
      >
        <ReactQuill
          modules={{
            toolbar: toolbarOptions,
          }}
          theme="snow"
          className={styles['question-quill']}
        />
      </Form.Item>
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

export default Question;
