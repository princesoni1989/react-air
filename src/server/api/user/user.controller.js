import * as userService from "./user.service";
import {SUCCESS_READ_OPERATION, UN_PROCESSABLE_ENTITY} from "server/constants/enums/HttpStatusCode";

export function findUser(req, res) {
  const id = req.user.id;
  userService.findUser(id)
    .then(user => res.sendSuccess(SUCCESS_READ_OPERATION, user))
    .catch(err => res.sendError(UN_PROCESSABLE_ENTITY, err))
}


export function signUpUser(req, res) {
  const user = req.body;
  userService.signUp(user)
    .then(user => res.sendSuccess(SUCCESS_READ_OPERATION, user))
    .catch(err => res.sendError(UN_PROCESSABLE_ENTITY, err))
}


export function findUsers(req, res) {
  userService.findUsers()
    .then(users => res.sendSuccess(SUCCESS_READ_OPERATION, users))
    .catch(err => res.sendError(UN_PROCESSABLE_ENTITY, err))
}
