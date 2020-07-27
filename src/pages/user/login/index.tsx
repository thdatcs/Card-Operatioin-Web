import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Alert, message, Form, Input, Button } from 'antd';
import React, { useState } from 'react';
import { Link, SelectLang, useModel } from 'umi';
import { getPageQuery } from '@/utils/utils';
import logo from '@/assets/logo.svg';
import Footer from '@/components/Footer';
import styles from './style.less';
import { loginByForm } from "@/services/user/authentication";


const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/**
 * 此方法会跳转到 redirect 参数所在的位置
 */
const replaceGoto = () => {
  const urlParams = new URL(window.location.href);
  const params = getPageQuery();
  let { redirect } = params as { redirect: string };
  if (redirect) {
    const redirectUrlParams = new URL(redirect);
    if (redirectUrlParams.origin === urlParams.origin) {
      redirect = redirect.substr(urlParams.origin.length);
      if (redirect.match(/^\/.*#/)) {
        redirect = redirect.substr(redirect.indexOf('#') + 1);
      }
    } else {
      window.location.href = '/';
      return;
    }
  }
  window.location.href = urlParams.href.split(urlParams.pathname)[0] + (redirect || '/');
};

const Login: React.FC<{}> = () => {
  const [submitting, setSubmitting] = useState(false);
  const [loginState, setLoginState] = useState(true);

  const { refresh } = useModel('@@initialState');

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const status = await loginByForm({...values});
      if (!status) {
        replaceGoto();
        setTimeout(() => {
          refresh();
        }, 0);
        return;
      }
      setLoginState(false);
      console.log(status)
    } catch (error) {
      message.error(error);
    }
    setSubmitting(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang}>
        <SelectLang />
      </div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src={logo} />
              <span className={styles.title}>Ant Design</span>
            </Link>
          </div>
          <div className={styles.desc}>Ant Design 是西湖区最具影响力的 Web 设计规范</div>
        </div>

        <div className={styles.main}>
          <Form onFinish={(values) => {handleSubmit(values)}}>
            { loginState === false && !submitting && 
              <Alert
                style={{ marginBottom: 24 }}
                message='Login failed'
                type="error"
                showIcon
              />
            }
            <Form.Item 
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' }
              ]}
            >
              <Input
                prefix={<UserOutlined/>}
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item 
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined/>}
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Button 
              size="large" 
              type="primary" 
              htmlType="submit"
              style={{width: '100%'}}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
