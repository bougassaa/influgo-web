import React from 'react';
import {Modal, Button, Checkbox, Form, Input} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {useAuth} from "../auth/AuthProvider";

function SignInModal({open = false, openState}: {open: boolean, openState: React.Dispatch<any>}) {
    const {signIn} = useAuth();

    const handleOk = () => {
        openState(false);
    };

    const handleCancel = () => {
        openState(false);
    };

    const onFinish = (values: any) => {
        signIn(values.username, values.password);
    };

    return (
        <Modal title="Connectez-vous à Influgo"
               open={open}
               footer={null}
               onCancel={handleCancel}>
            <Form
                name="normal_login"
                size="large"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <div style={{marginTop: 8}}>
                        <a href="#">
                            Forgot password
                        </a>
                    </div>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block size="middle">
                        Log in
                    </Button>
                    <div style={{textAlign: "center", marginTop: 8}}>
                        Or <a href="#">register now!</a>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default SignInModal;