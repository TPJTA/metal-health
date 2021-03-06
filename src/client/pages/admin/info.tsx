import useApi from '@/api/hook';
import React, { useEffect, useState } from 'react';
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
} from 'antd';
import styles from '@/styles/adminInfo.module.scss';
import dynamic from 'next/dynamic';
import type { Ariticle } from '@/libs/types';
import UploadImage from '@/components/uploadImage';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
type AriticleTableList = Array<Ariticle & { key: number }>;

function Info() {
  const { getAriticleList, addAriticle, updateAriticle, removeeAriticle } =
    useApi(
      'getAriticleList',
      'addAriticle',
      'updateAriticle',
      'removeeAriticle',
    );
  const [infoList, setInfoList] = useState<AriticleTableList>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [ariticleTotal, setAriticleTotal] = useState<number>(0);
  const [searchKey, setSearchKey] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [form] = Form.useForm();

  const getInfoList = () => {
    getAriticleList({ page: curPage, size: 10, title: searchKey }).then(
      (res) => {
        setInfoList(res.data.map((i) => ({ ...i, key: i.id })));
        setAriticleTotal(res.count);
      },
    );
  };

  useEffect(() => {
    setCurPage(1);
    getInfoList();
  }, [searchKey]);

  useEffect(() => {
    getInfoList();
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
      const { id, title, content, cover } = form.getFieldsValue(true);
      if (id !== undefined) {
        updateAriticle(id, {
          title,
          content,
          cover: cover[0]?.response?.data,
        }).then(() => {
          message.success('????????????');
          closeModal();
          getInfoList();
        });
      } else {
        addAriticle(title, content, cover[0].response.data).then(() => {
          message.success('????????????');
          closeModal();
          getInfoList();
        });
      }
    });
  };

  const updateInfo = (record: Ariticle) => {
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
    removeeAriticle(id as any).then(() => {
      message.success('????????????');
      getInfoList();
    });
  };

  const columns: TableProps<Ariticle>['columns'] = [
    { title: '??????', key: 'title', dataIndex: 'title' },
    // { title: '??????', key: 'content', dataIndex: 'content' },
    {
      title: '??????',
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
        <Input.Search
          placeholder="????????????????????????"
          className={styles['info-search']}
          onChange={(event) => setSearchKey(event.target.value)}
        />
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
        dataSource={infoList}
        pagination={{
          current: curPage,
          showSizeChanger: false,
          onChange: pageChange,
          pageSize: 10,
          total: ariticleTotal,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div
              className={styles['info-content']}
              dangerouslySetInnerHTML={{ __html: record.content }}
            />
          ),
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
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <Form {...props}>
      <Form.Item
        label="??????"
        name="title"
        rules={[{ required: true, message: '???????????????' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="??????"
        getValueFromEvent={normFile}
        name="cover"
        valuePropName="fileList"
        rules={[{ required: true, message: '???????????????' }]}
      >
        <UploadImage fileList={props.form?.getFieldValue('cover')} />
      </Form.Item>
      <Form.Item
        label="??????"
        name="content"
        rules={[{ required: true, message: '???????????????' }]}
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

export default Info;
