import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

import './style.scss';
import { signUp } from '../../services/auth';

function SignIn() {
  const history = useHistory();
  const [isLoading, setLoading] = React.useState(false);
  const [isSuccess, setSuccess] = React.useState(null);
  const [message, setMessage] = React.useState(null);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    setMessage(null);
    setSuccess(null);

    const resp = await signUp(values);
    if (resp.success) {
      setMessage("Thanks for signing up, please check your email inbox to verify your email.");
      setSuccess(true)
    } else {
      setMessage(resp.error);
      setSuccess(false)
    }

    setLoading(false);
  };

  const handleSignInClick = () => {
    history.replace('/sign-in');
  }

  return (
    <Card
      className="SignIn"
      title={
        <h2 style={{ textAlign: 'center' }}>
          Sign up
        </h2>
      }
      style={{ width: '100%', maxWidth: 320, margin: '60px auto' }}>
      <Form
        form={form}
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}>
        {message && (isSuccess !== null) && (
          <Form.Item>
            <Typography.Text type={isSuccess ? "success" : "danger"}>{message}</Typography.Text>
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
            { min: 8, message: 'Password must be minimum 8 characters.' },
          ]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            disabled={isLoading}
          />
        </Form.Item>
        <Form.Item
          name="passwordConfirmation"
          rules={[
            {
              required: true,
              message: 'Please input your Password Confirmation!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Password confirmation is not matched!');
              },
            }),
          ]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password Confirmation"
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
            Sign Up
          </Button>
          <div>
            Already have an account? <Button className="sign-up-button" type="link" onClick={handleSignInClick}>Sign in</Button>
          </div>
        </Form.Item>
      </Form>
    </Card>
  );
}
export default SignIn;
