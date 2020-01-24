import { registerUser, checkUserName } from "../../controllers/register/registerController";
import { loginUser } from "../../controllers/login/loginController";

export default [
 
  {
    path: "/api/v1/register",
    method: "post",
    handler:  [ registerUser]
  },
  {
    path: "/api/v1/signin",
    method: "post",
    handler:  [ loginUser ]
  },
  {
    path: "/api/v1/checkusername",
    method: "post",
    handler:  [ checkUserName ]
  }
];