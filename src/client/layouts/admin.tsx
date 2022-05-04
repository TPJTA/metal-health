import React, { useEffect, useMemo } from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import styles from './admin.module.scss';
import Image from 'next/image';
import LogoImage from 'assets/images/logo.png';
import {
  ReadOutlined,
  CommentOutlined,
  EditOutlined,
  FundViewOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const { Header, Sider, Content } = Layout;
const routers = [
  {
    path: '/admin/info',
    name: '文章',
    icon: <ReadOutlined className={styles['nav-icon']} />,
  },
  {
    path: '/admin/testing',
    name: '测评',
    icon: <EditOutlined className={styles['nav-icon']} />,
  },
  {
    path: '/admin/question',
    name: '匿名提问',
    icon: <CommentOutlined className={styles['nav-icon']} />,
  },
  {
    path: '/admin/analyse',
    name: '分析',
    icon: <FundViewOutlined className={styles['nav-icon']} />,
  },
];

const AdminLayout: React.FC<{ children: React.ReactNode }> = function ({
  children,
}) {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get('Access_Token')) {
      router.replace('/admin/login');
    }
  }, []);
  const curRouter = useMemo(() => {
    const findIndex = routers.findIndex(({ path }) =>
      new RegExp(path).test(router.pathname),
    );
    return {
      index: findIndex.toString(),
      router: routers[findIndex],
    };
  }, [router]);
  return (
    <Layout className={styles['admin-layout']}>
      <Sider trigger={null} className={styles['admin-sider']}>
        <div className={styles['admin-logo']}>
          <Image src={LogoImage} alt="" layout="responsive" />
        </div>
        <Menu theme="dark" mode="inline" selectedKeys={[curRouter.index]}>
          {routers.map((i, index) => (
            <Menu.Item key={index.toString()} icon={i.icon}>
              <Link href={i.path}>{i.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles['admin-header']}>
          {curRouter.router.name}
        </Header>
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
