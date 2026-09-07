import { createBrowserRouter } from "react-router";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/HomePage";
import ErrorPage from "./pages/ErrorPage";
import TodolistPage from "./pages/TodolistPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> }
        ]
    },
    {
        path: "/my", 
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [{
            path: "todolistpage", element: <TodolistPage/>
        },]
    },
]);