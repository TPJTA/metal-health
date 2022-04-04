import Image from 'next/image';
import React, { useMemo } from 'react';
import styles from './index.module.scss';
import LogoImage from 'assets/images/logo.png';
import { Menu, Button } from 'antd';
import {
  HomeOutlined,
  ReadOutlined,
  CommentOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/router';
import Link from 'next/link';

const routers = [
  {
    path: '/',
    name: '首页',
    icon: <HomeOutlined className={styles['nav-icon']} />,
  },
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

function Header() {
  const router = useRouter();
  const curRouter = useMemo(() => {
    return router.pathname;
  }, [router]);
  return (
    <div className={styles['header']}>
      <div className={styles['header-content']}>
        <div className={styles['header-logo']}>
          <Image src={LogoImage} alt="" layout="responsive" />
        </div>
        <Menu
          mode="horizontal"
          className={styles['nav']}
          selectedKeys={[curRouter]}
        >
          {routers.map((i) => (
            <Menu.Item
              key={i.path}
              className={styles['nav-item']}
              icon={i.icon}
            >
              <Link href={i.path}>{i.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <Button type="link">
          <Link href="/admin/login">咨询师入口</Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;
