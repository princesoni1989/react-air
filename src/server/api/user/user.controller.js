import * as userService from "./user.service";
import httpStatusCode from "server/constants/enums/HttpStatusCode";

export function findUser(req, res) {
  const id = req.user.id;
  userService.findUser(id)
    .then(user => res.sendSuccess(httpStatusCode.SUCCESS_READ_OPERATION, user))
    .catch(err => res.sendError(httpStatusCode.UN_PROCESSABLE_ENTITY, err))
}


export function signUpUser(req, res) {
  const user = req.body;
  userService.signUpUser(user)
    .then(user => res.sendSuccess(httpStatusCode.SUCCESS_READ_OPERATION, user))
    .catch(err => res.sendError(httpStatusCode.UN_PROCESSABLE_ENTITY, err))
}


export function findUsers(req, res) {
  userService.findusers()
    .then(users => res.sendSuccess(httpStatusCode.SUCCESS_READ_OPERATION, users))
    .catch(err => res.sendError(httpStatusCode.UN_PROCESSABLE_ENTITY, err))
}
