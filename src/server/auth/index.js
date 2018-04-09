import express from "express";
import localRoutes from "./local";
import {setup} from "./local/passport";
import UserModel from "../api/user/user.model"

const router = express.Router();
setup(UserModel);

router.use("/local", localRoutes)

export default router;
