import express from 'express'
import {isAuthenticated} from 'server/auth/auth.service';
import {findUser, signUpUser, findUsers} from "./user.controller";

const router = express.Router()

router.post('/', signUpUser);
router.get('/users', isAuthenticated(), findUsers);
router.get('/me', isAuthenticated(), findUser);

export default router;
