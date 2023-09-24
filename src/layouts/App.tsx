import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthProvider from "../auth/AuthProvider";
import Index from "../routes/home/Index";
import {IntlProvider} from "react-intl";
import messages from "../lang/fr.json";

const routes = createBrowserRouter([
    {path: '/', element: <Index />}
]);

const App: React.FC = () => (
    <IntlProvider messages={messages} locale="fr">
        <AuthProvider>
            <RouterProvider router={routes} />
        </AuthProvider>
    </IntlProvider>
);

export default App;