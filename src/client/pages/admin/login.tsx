import React from 'react';
import styles from '@/styles/login.module.scss';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LogoImage from 'assets/images/logo.png';
import Image from 'next/image';

function Login() {
  const login = (val: any) => {
    console.log(val);
  };

  return (
    <div className={styles['login']}>
      <div className={styles['login-logo']}>
        <Image src={LogoImage} alt="" layout="responsive" />
      </div>
      <Form
        name="login"
        className={styles['login-form']}
        initialValues={{ remember: true }}
        onFinish={login}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="请输入密码"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={styles['login-button']}
            block
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
