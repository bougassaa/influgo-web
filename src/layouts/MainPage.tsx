import React, {ReactNode, useState} from 'react';
import {Avatar, Button, Dropdown, Layout, Menu, theme} from "antd";
import {LogoutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import SignInModal from "../components/SignInModal";
import SignUpModal from "../components/SignUpModal";
import {useAuth} from "../auth/AuthProvider";
import {ItemType} from "antd/es/menu/hooks/useItems";
import {useIntl} from "react-intl";

const { Header, Content, Footer } = Layout;

const layoutStyle: React.CSSProperties = {
    minHeight: '100vh',
};

function MainPage({children, title}: {children?: ReactNode, title: string}) {
    const intl = useIntl();
    const {isSigned, signOut} = useAuth();

    const {
        token: { colorBgContainer, colorPrimary },
    } = theme.useToken();

    const [openSignIn, setOpenSignIn] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);

    const headerItems: ItemType[] = [
        {
            key: 'home',
            label: 'Accueil',
        },
        {
            key: 'other',
            label: 'Autre',
        },
    ];

    const dropdownItems: ItemType[] = [
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: intl.$t({id: 'user_settings'})
        },
        {
            key: 'signout',
            danger: true,
            icon: <LogoutOutlined />,
            label: intl.$t({id: 'signout_action'}),
            onClick: signOut
        },
    ];

    return (
        <>
            <Layout style={layoutStyle}>
                <Header style={{display: 'flex', alignItems: 'center'}}>
                    <Menu
                        style={{ minWidth: 0, flex: "auto" }}
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['home']}
                        items={headerItems}
                    />
                    {
                        isSigned ?
                            (
                                <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
                                    <Avatar size="large" shape="square" style={{background: colorPrimary}} icon={<UserOutlined />} />
                                </Dropdown>
                            ) :
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