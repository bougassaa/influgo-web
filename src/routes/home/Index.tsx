import React from 'react';
import MainPage from "../../layouts/MainPage";
import {useIntl} from "react-intl";

function Index() {
    const intl = useIntl();

    return (
        <MainPage title={intl.$t({id: 'home'})}>

        </MainPage>
    );
}

export default Index;