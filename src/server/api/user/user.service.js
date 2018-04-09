import userModel from "./user.model";
import Roles from "server/constants/enums/Roles"

export function findUser(id) {
  return userModel.findById(id, "-salt -password").exec()
}


export function signUpUser(user) {
  let newUser = new userModel(user);
  return newUser.save();
}


export function findusers() {
  return userModel.find({}, '-salt -password').exec();
}
