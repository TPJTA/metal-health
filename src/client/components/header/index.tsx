import Image from 'next/image';
import React, { useMemo, useState } from 'react';
import styles from './index.module.scss';
import LogoImage from 'assets/images/logo.png';
import { Menu, Button, Drawer, MenuProps } from 'antd';
import {
  HomeOutlined,
  ReadOutlined,
  CommentOutlined,
  EditOutlined,
  MenuOutlined,
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
    path: '/inbox',
    name: '匿名提问',
    icon: <CommentOutlined className={styles['nav-icon']} />,
  },
];

function Header() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const curRouter = useMemo(() => {
    return router.pathname;
  }, [router]);

  const showMenu = () => {
    setMenuVisible(true);
  };
  const hiddenMenu = () => {
    setMenuVisible(false);
  };

  const menuItems = useMemo(() => {
    return routers.map((i) => ({
      label: i.name,
      key: i.path,
      icon: i.icon,
      path: i.path,
    }));
  }, []);

  const menuClick: MenuProps['onClick'] = (item) => {
    router.push(item.key);
  };
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
          items={menuItems}
          onClick={menuClick}
        />
        <Button type="link" className={styles['admin-button']}>
          <Link href="/admin/login">咨询师入口</Link>
        </Button>

        <MenuOutlined onClick={showMenu} className={styles['menu-button']} />
      </div>
      <Drawer
        className={styles['menu-drawer']}
        placement="right"
        onClose={hiddenMenu}
        visible={menuVisible}
      >
        <div className={styles['header-menu-logo']}>
          <Image src={LogoImage} alt="" layout="responsive" />
        </div>
        <Menu mode="vertical" selectedKeys={[curRouter]}>
          {routers.map((i) => (
            <Menu.Item
              key={i.path}
              className={styles['nav-item']}
              icon={i.icon}
              onClick={hiddenMenu}
            >
              <Link href={i.path}>{i.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </div>
  );
}

export default Header;
