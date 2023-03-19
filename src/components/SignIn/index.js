import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import './style.scss';
import { signIn, setAuthToken } from '../../services/auth';

const getInitMessage = (accountVerifyStatus) => {
  if (accountVerifyStatus === 'success') {
    return 'Your account has been verified, please sign in.';
  }

  if (accountVerifyStatus === 'fail') {
    return 'Your account verification has failed, please try again.';
  }

  return null
}

function SignIn({ accountVerifyStatus }) {
  const history = useHistory();
  const [isLoading, setLoading] = React.useState(false);
  const [message, setMessage] = React.useState(getInitMessage(accountVerifyStatus));

  const onFinish = async (values) => {
    setLoading(true);
    setMessage(null);
    const resp = await signIn(values);

    if (resp.success) {
      setAuthToken(resp.data.data.token);
      history.replace('/reports');
    } else {
      setMessage(resp.error);
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    history.replace('/sign-up');
  }

  return (
    <Card
      className="SignIn"
      title={
        <h2 style={{ textAlign: 'center' }}>
          Sign in
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
            <Typography.Text type={accountVerifyStatus === 'success' ? 'success' : 'danger'}>{message}</Typography.Text>
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%' }}
            disabled={isLoading}
          >
            Sign In
          </Button>
          <div>
            Not have an account yet? <Button className="sign-up-button" type="link" onClick={handleSignUpClick}>Sign up</Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}
export default SignIn;
