import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./routes/home/Index";
import SignIn from "./routes/authentication/SignIn";
import AuthProvider from "./auth/AuthProvider";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const routes = createBrowserRouter([
    {path: '/', element: <Index />},
    {path: '/signin', element: <SignIn />}
]);

root.render(
    <AuthProvider>
        <RouterProvider router={routes} />
    </AuthProvider>
);

