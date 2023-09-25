import React from 'react';
import {Result} from "antd";
import {useIntl} from "react-intl";
import {Link} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";

function NotFoundPage() {
    const intl = useIntl();

    const GoBackLink = () => (
        <Link to={'/'} style={{display: "inline-flex", alignItems: "center", gap: 4}}>
            <HomeOutlined />
            {intl.$t({id: 'go_home'})}
        </Link>
    )

    return (
        <Result
            status="404"
            title="404"
            subTitle={intl.$t({id: 'page_not_found'})}
            extra={<GoBackLink />}
        />
    );
}

export default NotFoundPage;