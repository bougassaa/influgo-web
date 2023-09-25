import React, {useState} from 'react';
import {Modal, Button, Checkbox, Form, Input, Alert, message} from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {useAuth} from "../auth/AuthProvider";
import {useIntl} from "react-intl";

function SignInModal({open = false, openState, openSignUp}: {
    open: boolean, openState: React.Dispatch<any>, openSignUp: React.Dispatch<any>
}) {
    const intl = useIntl();
    const {signIn} = useAuth();

    const [signInFailed, setSignInFailed] = useState(false);

    const handleCancel = () => {
        openState(false);
    };

    const handleOpenSignUp = () => {
        openState(false);
        openSignUp(true);
    };

    const onFinish = (values: any) => {
        signIn(values.username, values.password)
            .then(r => {
                openState(false);
                message.open({
                    content: intl.$t({id: 'signin_successful'})
                })
            })
            .catch(_ => {
                setSignInFailed(true);
            })
    };

    const ModalHeader = () => (
        <div style={{paddingBottom: 15}}>
            {intl.$t({id: 'signin_title'})}
        </div>
    )

    return (
        <Modal title={<ModalHeader />}
               width={420}
               open={open}
               footer={null}
               onCancel={handleCancel}>
            {signInFailed && (
                <Alert message={intl.$t({id: 'signin_failed'})} type="error" style={{marginBottom: 16}} />
            )}
            <Form
                name="normal_login"
                size="large"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: intl.$t({id: 'signin_not_empty_username'}) }]}
                >
                    <Input prefix={<UserOutlined />} type="email" placeholder={intl.$t({id: 'email'})} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: intl.$t({id: 'signin_not_empty_password'}) }]}
                >
                    <Input.Password
                        prefix={<LockOutlined />}
                        placeholder={intl.$t({id: 'password'})}
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>{intl.$t({id: 'signin_remember'})}</Checkbox>
                    </Form.Item>
                    <Button size="small" type="link" style={{float: "right"}}>
                        {intl.$t({id: 'signin_forgot_password'})}
                    </Button>
                </Form.Item>
                <Form.Item noStyle>
                    <Button type="primary" htmlType="submit" block size="middle">
                        {intl.$t({id: 'signin_action'})}
                    </Button>
                    <div style={{textAlign: "center", marginTop: 8}}>
                        {intl.$t({id: 'or'})}
                        <Button type="link" size="small" onClick={handleOpenSignUp}>
                            {intl.$t({id: 'signin_create_account'})}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default SignInModal;