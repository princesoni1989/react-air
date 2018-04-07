import React from "react";
import Loadable from "react-loadable";
import Loading from "components/Loading";

const Landing = Loadable({
    loader: () => import(/* webpackChunkName: 'landing' */ "components/Landing"),
    loading: () => <Loading />
});

const Login = Loadable({
    loader: () => import(/* webpackChunkName: 'login' */ "components/Authentication/Login"),
    loading: () => <Loading />
});

const SignUp = Loadable({
    loader: () => import(/* webpackChunkName: 'signUp' */ "components/Authentication/SignUp"),
    loading: () => <Loading />
});


const authRoutes = [
    {
        path: "/",
        component: Landing,
        title: "landing",
        name: "landing",
        exact: true
    },
    {
        path: "/login",
        title: "login",
        name: "login",
        component: Login
    },
    {
        path: "/signup",
        title: "signup",
        name: "signUp",
        component: SignUp
    },
]

export default authRoutes;
