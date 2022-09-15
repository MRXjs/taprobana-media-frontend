import * as AuthApi from "../api/AuthRequst";
import Swal from "sweetalert2";

export const LogIn = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
    Swal.fire({
      title: "Error!",
      text: "Invalid Username or Password",
      icon: "warning",
      confirmButtonText: "Cool",
    });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAIL" });
    Swal.fire({
      title: "Error!",
      text: "Internal server error",
      icon: "error",
      confirmButtonText: "Cool",
    });
  }
};

export const logOut = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
