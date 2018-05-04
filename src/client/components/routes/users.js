import React from "react";
import Loadable from "react-loadable";
import Loading from "components/Loading";
import fetchUsers from "actions/users";

const Users = Loadable({
    loader: () => import(/* webpackChunkName: "users" */ "components/Users"),
    loading: () => <Loading />
});

const userRoutes = [
  {
    path: "/users",
    title: "users",
    name: "users",
    authenticate: true,
    preLoadedActions: [fetchUsers],
    component: Users
  }
]

export default userRoutes;
