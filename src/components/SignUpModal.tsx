import React, {useState} from 'react';
import {Alert, Button, Form, Input, message, Modal, Space} from "antd";
import {useAuth} from "../auth/AuthProvider";
import {useIntl} from "react-intl";
import {createUser} from "../api/user";

function SignUpModal({open = false, openState, openSignIn}: {
    open: boolean, openState: React.Dispatch<any>, openSignIn: React.Dispatch<any>
}) {
    const [form] = Form.useForm();
    const intl = useIntl();
    const {signIn} = useAuth();
    const [signUpError, setSignUpError] = useState("");

    const onFinish = (values: any) => {
        createUser(values)
            .then(r => {
                signIn(values.email, values.password)
                    .then(r => {
                        openState(false);
                        message.open({
                            content: intl.$t({id: 'signin_successful'})
                        })
                    })
            })
            .catch(({response}) => {
                let error = response?.data?.error;
                if (response.status === 409) { // duplicates email
                    error = intl.$t({id: 'signup_duplicate_email'});
                    form.setFields([
                        {name: 'email', errors: [error]}
                    ])
                }
                setSignUpError(error);
            })

    };

    const handleCancel = () => {
        openState(false);
    };

    const handleOpenSignUp = () => {
        openState(false);
        openSignIn(true);
    };

    const ModalHeader = () => (
        <div style={{paddingBottom: 15}}>
            {intl.$t({id: 'signup_title'})}
        </div>
    )

    return (
        <Modal title={<ModalHeader />}
               width={420}
               open={open}
               footer={null}
               onCancel={handleCancel}>
            {signUpError.length > 0 && (
                <Alert message={signUpError} type="error" style={{marginBottom: 16}} />
            )}
            <Form form={form}
                  name="signup"
                  layout="vertical"
                  onFinish={onFinish}
            >
                <Space>
                    <Form.Item name="first_name" label={intl.$t({id: 'first_name'})} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="last_name" label={intl.$t({id: 'last_name'})} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Space>
                <Form.Item name="email" label={intl.$t({id: 'email'})} rules={[{ required: true }]}>
                    <Input type="email" />
                </Form.Item>
                <Form.Item name="password" label={intl.$t({id: 'password'})} rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item noStyle>
                    <Button type="primary" htmlType="submit" block>
                        {intl.$t({id: 'signup_action'})}
                    </Button>
                    <div style={{textAlign: "center", marginTop: 8}}>
                        {intl.$t({id: 'or'})}
                        <Button type="link" size="small" onClick={handleOpenSignUp}>
                            {intl.$t({id: 'signup_log_account'})}
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default SignUpModal;