import React, { useRef } from 'react';
import styles from '@/styles/inbox.module.scss';
import { Form, Input, Button, Modal, FormInstance } from 'antd';
import dynamic from 'next/dynamic';
import { HTMLToText } from '@/libs/tool';
import useApi from '@/api/hook';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function Question() {
  const { sentInbox } = useApi('sentInbox');
  const form = Form.useForm<{ question: string; email: string }>()[0];

  const sentQuestion = ({
    question,
    email,
  }: {
    question: string;
    email: string;
  }) => {
    form.resetFields(['question', 'email']);
    sentInbox(email, question).then(() => {
      Modal.success({
        content: `已发送, 等待咨询员回答, 回答会发送至 ${email} 邮箱中`,
        okText: '确定',
      });
    });
  };

  return (
    <div className={styles['inbox']}>
      <div className={styles['inbox-contain']}>
        <div className={styles['inbox-title']}>匿名提问</div>
        <Form
          className={styles['inbox-form']}
          onFinish={sentQuestion}
          form={form}
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                message: '请输入正确的邮箱',
              },
            ]}
          >
            <Input placeholder="请输入你的邮箱" />
          </Form.Item>
          <Form.Item
            label="问题"
            name="question"
            rules={[
              {
                transform: HTMLToText,
                required: true,
                message: '请描述你的问题',
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
          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button size="large" type="primary" htmlType="submit">
              发送
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

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
