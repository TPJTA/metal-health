import React from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import styles from './admin.module.scss';
import {
  HomeOutlined,
  ReadOutlined,
  CommentOutlined,
  EditOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const routers = [
  {
    path: '/info',
    name: '文章',
    icon: <ReadOutlined className={styles['nav-icon']} />,
  },
  {
    path: '/testing',
    name: '测评',
    icon: <EditOutlined className={styles['nav-icon']} />,
  },
  {
    path: '/question',
    name: '匿名提问',
    icon: <CommentOutlined className={styles['nav-icon']} />,
  },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = function ({
  children,
}) {
  return (
    <Layout className={styles['admin-layout']}>
      <Sider trigger={null}>
        <div className={styles['admin-logo']} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {routers.map((i) => (
            <Menu.Item key={i.path} icon={i.icon}>
              <Link href={i.path}>{i.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles['admin-header']}>文章</Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
