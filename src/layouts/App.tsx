import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AuthProvider from "../auth/AuthProvider";
import Index from "../routes/home/Index";

const routes = createBrowserRouter([
    {path: '/', element: <Index />}
]);

const App: React.FC = () => (
    <AuthProvider>
        <RouterProvider router={routes} />
    </AuthProvider>
);

export default App;