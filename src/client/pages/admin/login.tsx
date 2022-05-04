import React from 'react';
import styles from '@/styles/login.module.scss';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import LogoImage from 'assets/images/logo.png';
import Image from 'next/image';
import useApi from '@/api/hook';
import { useRouter } from 'next/router';

function Login() {
  const { login } = useApi('login');
  const router = useRouter();

  const onLogin = (val: any) => {
    login(val)
      .then(() => {
        router.push('/admin/info');
      })
      .catch(() => {
        message.error('用户名或密码错误');
      });
  };

  return (
    <div className={styles['login']}>
      <div className={styles['login-logo']}>
        <Image src={LogoImage} alt="" layout="responsive" />
      </div>
      <Form
        name="login"
        className={styles['login-form']}
        initialValues={{
          username: 'admin',
          password: 'password',
        }}
        onFinish={onLogin}
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
