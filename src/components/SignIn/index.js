import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import './style.scss';
import { signIn, setAuthToken } from '../../services/auth';

function SignIn() {
  // const history = useHistory();
  const [isLoading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(null);

  const onFinish = async (values) => {
    setLoading(true);
    setMessage(null);
    const resp = await signIn(values);
    setLoading(false);
    if (resp.success) {
      console.log('====>ok')
      setAuthToken(resp.data.token);
      // history.replace('/dashboard');
    } else {
      console.log('====>no')
      setMessage(resp.error);
      setLoading(false);
    }
  };

  // return (
  //   <div>aaa</div>
  // )

  return (
    <Card
      className="SignIn"
      title={
        <h2 style={{ textAlign: 'center' }}>
          Authentication Required
        </h2>
      }
      style={{ width: '100%', maxWidth: 320, margin: '60px auto' }}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}>
        {message && (
          <Form.Item>
            <Typography.Text type="danger">{message}</Typography.Text>
          </Form.Item>
        )}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}>
          <Input
            autoFocus={true}
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
            },
          ]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {/* <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%' }}
            disabled={isLoading}>
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
export default SignIn;
