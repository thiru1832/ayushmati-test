import { TroubleshootOutlined } from "@mui/icons-material";
import { API_URL } from "../utils/constant";
import axios from "axios";

const initalState = {
  emailId: "",
  role: "",
  firstName: "",
  userId: "",
  isAuthenticated: false,
};

const userLoginReducer = (state = initalState, action) => {
  console.log("inside reducer");
  console.log(action.user);
  console.log(action.type);
  console.log("inside reducer");
  switch (action.type) {
    case "USERSTATEUPDATE":
      console.log(action.user);
      console.log(action.user["role"]);
      console.log(action.user["emailID"]);

      return {
        ...initalState,
        emailId: action.user.emailID,
        role: action.user.role,
        firstName: action.user.firstName,
        userId: action.user.userId,
        isAuthenticated: true,
      };

    case "USERLOGOUT":
      console.log("inside logout");
      localStorage.removeItem("token");
      axios
        .post(API_URL + "/authenticate/logout");

      return initalState;

    default:
      return initalState;
  }
};

export default userLoginReducer;
