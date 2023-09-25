import React, {ReactNode, useState} from 'react';
import {Button, Layout, Menu, theme} from "antd";
import {UserOutlined} from "@ant-design/icons";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
import {useAuth} from "../auth/AuthProvider";

const { Header, Content, Footer } = Layout;

const layoutStyle: React.CSSProperties = {
    minHeight: '100vh',
};

const items = new Array(6).fill(null).map((_, index) => ({
    key: String(index + 1),
    label: `nav ${index + 1}`,
}));

function MainPage({children, title}: {children?: ReactNode, title: string}) {
    const {isSigned, signOut} = useAuth();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);

    return (
        <>
            <Layout style={layoutStyle}>
                <Header style={{display: 'flex', alignItems: 'center'}}>
                    <Menu
                        style={{ minWidth: 0, flex: "auto" }}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        items={items}
                    />
                    {
                        isSigned ?
                        <Button onClick={signOut}>Log out</Button> :
                        <div style={{display: "flex", gap: 6}}>
                            <Button icon={<UserOutlined />} ghost onClick={() => setOpenSignIn(true)}>Sign In</Button>
                            <Button onClick={() => setOpenSignUp(true)}>Sign Up</Button>
                        </div>
                    }
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <h1>{title}</h1>
                    <div style={{ padding: 24, background: colorBgContainer }}>
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
            {!isSigned && <>
                <SignInModal open={openSignIn} openState={setOpenSignIn} openSignUp={setOpenSignUp}/>
                <SignUpModal open={openSignUp} openState={setOpenSignUp} openSignIn={setOpenSignIn}/>
            </>}
        </>
    );
}

export default MainPage;