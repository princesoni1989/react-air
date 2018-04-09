import {merge} from "lodash"
import {isDev} from "server/helper"
import development from "./development";
import production from "./production";
import UserRoles from "server/constants/enums/Roles"

const config = {
    port: process.env.PORT || 9000,

    seed: false,

    secret: "react-air",

    roles: [UserRoles.USER, UserRoles.USER]

}

const environmentConfig = isDev() ? development : production;

export default merge(config, environmentConfig);

